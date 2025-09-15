package com.todo360.common.messaging;

import com.todo360.features.todo.model.Todo;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TodoEventProducer {
    private static final Logger log = LoggerFactory.getLogger(TodoEventProducer.class);

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publishTodoCreated(Todo todo) {
        TodoEvent event = TodoEvent.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .description(todo.getDescription())
                .completed(todo.isCompleted())
                .collectionId(todo.getCollection() != null ? todo.getCollection().getId() : null)
                .build();

        log.debug("Publishing todo.created event for id={}", todo.getId());
        kafkaTemplate.send(KafkaTopics.TODO_EVENTS, todo.getId() != null ? todo.getId().toString() : null, event);
    }

    public void publishTodoDeleted(Long id) {
        TodoEvent event = TodoEvent.builder()
                .id(id)
                .build();

        log.debug("Publishing todo.deleted event for id={}", id);
        kafkaTemplate.send(KafkaTopics.TODO_EVENTS, id != null ? id.toString() : null, event);
    }
}

