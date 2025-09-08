package com.todo360.features.todo.bootstrap;

import com.todo360.features.todo.model.Todo;
import com.todo360.features.todo.service.TodoService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DataLoaderTest {

    @Mock
    private TodoService todoService;

    @InjectMocks
    private DataLoader dataLoader;

    @Test
    void run_shouldLoadInitialData_whenTodoListIsEmpty() throws Exception {
        // Arrange
        when(todoService.findAll()).thenReturn(new ArrayList<>());

        // Act
        dataLoader.run();

        // Assert
        verify(todoService, times(3)).save(any(Todo.class));
    }

    @Test
    void run_shouldNotLoadInitialData_whenTodoListIsNotEmpty() throws Exception {
        // Arrange
        when(todoService.findAll()).thenReturn(List.of(new Todo()));

        // Act
        dataLoader.run();

        // Assert
        verify(todoService, never()).save(any(Todo.class));
    }
}
