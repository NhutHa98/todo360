package com.todo360.features.todo.repository;

import com.todo360.features.todo.model.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Repository
@Profile("redis")
public class TodoRepositoryRedisImpl implements TodoRepositoryCustom {
    private final TodoRedisRepository redisRepository;

    @Autowired
    public TodoRepositoryRedisImpl(TodoRedisRepository redisRepository) {
        this.redisRepository = redisRepository;
    }

    @Override
    public Todo save(Todo todo) {
        return redisRepository.save(todo);
    }

    @Override
    public Optional<Todo> findById(Long id) {
        return redisRepository.findById(id);
    }

    @Override
    public List<Todo> findAll() {
        return StreamSupport.stream(redisRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        redisRepository.deleteById(id);
    }
}

