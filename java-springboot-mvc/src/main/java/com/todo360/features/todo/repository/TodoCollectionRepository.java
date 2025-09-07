package com.todo360.features.todo.repository;

import com.todo360.features.todo.model.TodoCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoCollectionRepository extends JpaRepository<TodoCollection, Long> {
}

