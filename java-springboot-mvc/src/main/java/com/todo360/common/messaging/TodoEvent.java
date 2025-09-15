package com.todo360.common.messaging;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoEvent {
    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private Long collectionId;
}

