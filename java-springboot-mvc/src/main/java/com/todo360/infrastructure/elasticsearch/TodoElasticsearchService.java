package com.todo360.infrastructure.elasticsearch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TodoElasticsearchService {
    private final TodoElasticsearchRepository repository;

    @Autowired
    public TodoElasticsearchService(TodoElasticsearchRepository repository) {
        this.repository = repository;
    }

    public TodoDocument save(TodoDocument todo) {
        return repository.save(todo);
    }

    public List<TodoDocument> search(String query) {
        return repository.findByTitleContainingOrDescriptionContaining(query, query);
    }
}

