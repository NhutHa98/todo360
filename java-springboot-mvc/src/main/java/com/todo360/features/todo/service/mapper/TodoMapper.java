package com.todo360.features.todo.service.mapper;

import com.todo360.features.todo.dto.TodoDto;
import com.todo360.features.todo.model.Todo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {TagMapper.class, TodoCollectionMapper.class})
public interface TodoMapper {

    @Mapping(target = "tags", source = "tags")
    @Mapping(target = "collection", source = "collection")
    TodoDto toDto(Todo todo);

    @Mapping(target = "tags", source = "tags")
    @Mapping(target = "collection", source = "collection")
    Todo toEntity(TodoDto dto);
}
