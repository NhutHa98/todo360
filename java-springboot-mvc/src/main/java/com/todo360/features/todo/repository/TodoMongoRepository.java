package com.todo360.features.todo.repository;

import com.todo360.features.todo.model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TodoMongoRepository extends MongoRepository<Todo, Long> {
}

