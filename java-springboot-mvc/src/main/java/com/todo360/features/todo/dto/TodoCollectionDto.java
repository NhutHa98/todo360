package com.todo360.features.todo.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoCollectionDto {
    private Long id;
    private String name;
    private String description;
}

