package com.todo360.features.todo.service.mapper;

import com.todo360.features.todo.dto.TodoCollectionDto;
import com.todo360.features.todo.model.TodoCollection;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TodoCollectionMapper {
    TodoCollectionDto toDto(TodoCollection collection);
    TodoCollection toEntity(TodoCollectionDto dto);
}

