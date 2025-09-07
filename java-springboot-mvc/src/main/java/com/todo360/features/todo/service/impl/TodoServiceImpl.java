package com.todo360.features.todo.service.impl;

import com.todo360.features.todo.model.Todo;
import com.todo360.features.todo.repository.TodoRepository;
import com.todo360.features.todo.service.TodoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService {

    private final TodoRepository repository;

    public TodoServiceImpl(TodoRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Todo> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Todo> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Todo save(Todo todo) {
        return repository.save(todo);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}

