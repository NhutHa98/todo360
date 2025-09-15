package com.todo360.common.messaging;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class TodoEventConsumer {
    private static final Logger log = LoggerFactory.getLogger(TodoEventConsumer.class);

    @KafkaListener(topics = "${kafka.topic.todo-events:todo-events}", groupId = "${kafka.consumer.group-id:todo-group}")
    public void onMessage(TodoEvent event) {
        // Basic consumer that logs events. Replace with real logic (sync read model update, notifications, etc.)
        if (event == null) {
            log.warn("Received null TodoEvent");
            return;
        }

        if (event.getTitle() != null) {
            log.info("Received todo event - id: {}, title: {}, completed: {}", event.getId(), event.getTitle(), event.isCompleted());
        } else {
            log.info("Received todo event (likely delete) - id: {}", event.getId());
        }
    }
}

