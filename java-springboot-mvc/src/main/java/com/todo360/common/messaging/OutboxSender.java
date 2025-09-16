package com.todo360.common.messaging;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.PageRequest;

import java.time.Instant;
import java.util.List;

@Component
public class OutboxSender {
    private static final Logger log = LoggerFactory.getLogger(OutboxSender.class);

    private final EventRecordRepository repository;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final ObjectMapper objectMapper;

    @Value("${outbox.batch-size:50}")
    private int batchSize;

    @Value("${outbox.max-attempts:5}")
    private int maxAttempts;

    public OutboxSender(EventRecordRepository repository, KafkaTemplate<String, Object> kafkaTemplate, ObjectMapper objectMapper) {
        this.repository = repository;
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    @Scheduled(fixedDelayString = "${outbox.poll-interval-ms:5000}")
    public void pollAndSend() {
        try {
            List<EventRecord> pending = repository.findByStatusOrderByOccurredAtAsc(EventStatus.PENDING, PageRequest.of(0, batchSize));
            if (pending.isEmpty()) return;
            for (EventRecord record : pending) {
                sendRecord(record);
            }
        } catch (Exception e) {
            log.error("Outbox sender failed", e);
        }
    }

    @Transactional
    protected void sendRecord(EventRecord record) {
        try {
            record.setAttempts(record.getAttempts() + 1);
            record.setLastAttemptAt(Instant.now());
            repository.save(record);

            // payload is stored as JSON string
            String payload = record.getPayload();

            kafkaTemplate.send(record.getTopic(), record.getAggregateId(), payload).addCallback(result -> {
                record.setStatus(EventStatus.SENT);
                record.setSentAt(Instant.now());
                repository.save(record);
                log.debug("Outbox record {} sent to topic={}", record.getId(), record.getTopic());
            }, ex -> {
                log.warn("Failed to send outbox record {}: {}", record.getId(), ex.getMessage());
                if (record.getAttempts() >= maxAttempts) {
                    record.setStatus(EventStatus.FAILED);
                }
                repository.save(record);
            });
        } catch (Exception e) {
            log.error("Error while sending outbox record {}", record.getId(), e);
            if (record.getAttempts() >= maxAttempts) {
                record.setStatus(EventStatus.FAILED);
            }
            repository.save(record);
        }
    }
}

