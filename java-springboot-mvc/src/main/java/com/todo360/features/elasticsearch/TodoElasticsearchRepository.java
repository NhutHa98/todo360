package com.todo360.features.elasticsearch;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import java.util.List;

public interface TodoElasticsearchRepository extends ElasticsearchRepository<TodoDocument, String> {
    List<TodoDocument> findByTitleContainingOrDescriptionContaining(String title, String description);
}

