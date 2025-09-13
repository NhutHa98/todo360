package com.todo360.features.todo.repository;

import com.todo360.features.todo.model.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Profile("jpa")
public class TodoRepositoryJpaImpl implements TodoRepositoryCustom {
    private final JpaRepository<Todo, Long> jpaRepository;

    @Autowired
    public TodoRepositoryJpaImpl(JpaRepository<Todo, Long> jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Todo save(Todo todo) {
        return jpaRepository.save(todo);
    }

    @Override
    public Optional<Todo> findById(Long id) {
        return jpaRepository.findById(id);
    }

    @Override
    public List<Todo> findAll() {
        return jpaRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }
}
