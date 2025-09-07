package com.todo360.features.todo.service.mapper;

import com.todo360.features.todo.dto.TagDto;
import com.todo360.features.todo.model.Tag;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TagMapper {
    TagDto toDto(Tag tag);
    Tag toEntity(TagDto dto);
}

