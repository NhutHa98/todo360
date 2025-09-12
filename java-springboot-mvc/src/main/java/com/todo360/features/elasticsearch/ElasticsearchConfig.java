package com.todo360.features.elasticsearch;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;

@Configuration
public class ElasticsearchConfig extends ElasticsearchConfiguration {
    @Override
    public String getHost() {
        // Default to localhost, change if needed
        return "localhost";
    }

    @Override
    public int getPort() {
        // Default Elasticsearch port
        return 9200;
    }

    @Bean
    public ElasticsearchOperations elasticsearchTemplate() {
        return new ElasticsearchTemplate(elasticsearchClient());
    }
}

