package com.todo360.features.todo.bootstrap;

import com.todo360.features.todo.model.Todo;
import com.todo360.features.todo.service.TodoService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final TodoService todoService;

    public DataLoader(TodoService todoService) {
        this.todoService = todoService;
    }

    @Override
    public void run(String... args) throws Exception {
        if (todoService.findAll().isEmpty()) {
            todoService.save(Todo.builder().title("Buy groceries").description("Milk, Bread, Eggs").build());
            todoService.save(Todo.builder().title("Read book").description("Finish chapter 4").build());
            todoService.save(Todo.builder().title("Workout").description("30 minutes").build());
        }
    }
}
    public void run(String... args) {
