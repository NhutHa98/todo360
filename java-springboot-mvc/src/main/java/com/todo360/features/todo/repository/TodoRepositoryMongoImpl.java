package com.todo360.features.todo.repository;

import com.todo360.features.todo.model.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Profile("mongo")
public class TodoRepositoryMongoImpl implements TodoRepositoryCustom {
    private final TodoMongoRepository mongoRepository;

    @Autowired
    public TodoRepositoryMongoImpl(TodoMongoRepository mongoRepository) {
        this.mongoRepository = mongoRepository;
    }

    @Override
    public Todo save(Todo todo) {
        return mongoRepository.save(todo);
    }

    @Override
    public Optional<Todo> findById(Long id) {
        return mongoRepository.findById(id);
    }

    @Override
    public List<Todo> findAll() {
        return mongoRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        mongoRepository.deleteById(id);
    }
}

