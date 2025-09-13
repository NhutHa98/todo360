package com.todo360.features.todo.repository;

import com.todo360.features.todo.model.Todo;
import java.util.List;
import java.util.Optional;

public interface TodoRepositoryCustom {
    Todo save(Todo todo);
    Optional<Todo> findById(Long id);
    List<Todo> findAll();
    void deleteById(Long id);
}

