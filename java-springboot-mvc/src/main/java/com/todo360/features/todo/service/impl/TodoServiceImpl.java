package com.todo360.features.todo.service.impl;

import com.todo360.features.elasticsearch.TodoDocument;
import com.todo360.features.elasticsearch.TodoElasticsearchService;
import com.todo360.features.todo.model.Todo;
import com.todo360.features.todo.repository.TodoRepository;
import com.todo360.features.todo.service.TodoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService {

    private final TodoRepository repository;
    private final TodoElasticsearchService elasticsearchService;

    public TodoServiceImpl(TodoRepository repository, TodoElasticsearchService elasticsearchService) {
        this.repository = repository;
        this.elasticsearchService = elasticsearchService;
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
        Todo saved = repository.save(todo);
        // Index in Elasticsearch
        TodoDocument doc = new TodoDocument();
        doc.setId(saved.getId().toString());
        doc.setTitle(saved.getTitle());
        doc.setDescription(saved.getDescription());
        doc.setCompleted(saved.isCompleted());
        elasticsearchService.save(doc);
        return saved;
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<TodoDocument> searchTodos(String query) {
        return elasticsearchService.search(query);
    }
}
