package com.todo360.common.messaging;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class OutboxService {
    private static final Logger log = LoggerFactory.getLogger(OutboxService.class);

    private final EventRecordRepository repository;
    private final ObjectMapper objectMapper;

    public OutboxService(EventRecordRepository repository, ObjectMapper objectMapper) {
        this.repository = repository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public EventRecord enqueueEvent(String topic, String eventType, String aggregateId, Object payload) {
        try {
            String json = objectMapper.writeValueAsString(payload);
            EventRecord record = new EventRecord(topic, "Todo", aggregateId, eventType, json, Instant.now());
            record = repository.save(record);
            log.debug("Enqueued event id={} topic={} type={}", record.getId(), topic, eventType);
            return record;
        } catch (Exception e) {
            throw new RuntimeException("Failed to serialize outbox payload", e);
        }
    }
}

