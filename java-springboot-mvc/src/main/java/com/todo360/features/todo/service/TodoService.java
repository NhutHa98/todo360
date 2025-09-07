package com.todo360.features.todo.service;

import com.todo360.features.todo.model.Todo;

import java.util.List;
import java.util.Optional;

public interface TodoService {
    List<Todo> findAll();
    Optional<Todo> findById(Long id);
    Todo save(Todo todo);
    void deleteById(Long id);
}

