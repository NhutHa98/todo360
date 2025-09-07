package com.todo360.features.todo.dto;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoDto {
    private Long id;
    private String title;
    private String description;
    private boolean completed;

    @Builder.Default
    private Set<TagDto> tags = new HashSet<>();

    private TodoCollectionDto collection;
}
