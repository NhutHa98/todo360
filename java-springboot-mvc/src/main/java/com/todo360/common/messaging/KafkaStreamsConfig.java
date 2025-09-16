package com.todo360.common.messaging;

import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.Consumed;
import org.apache.kafka.streams.kstream.Grouped;
import org.apache.kafka.streams.kstream.KeyValueMapper;
import org.apache.kafka.streams.kstream.Materialized;
import org.apache.kafka.streams.kstream.Produced;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.KeyValue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafkaStreams;
import org.springframework.kafka.config.KafkaStreamsConfiguration;
import org.springframework.kafka.config.KafkaStreamsDefaultConfiguration;
import org.springframework.kafka.support.serializer.JsonSerde;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableKafkaStreams
public class KafkaStreamsConfig {

    @Value("${kafka.bootstrap-servers:localhost:9092}")
    private String bootstrapServers;

    @Bean(name = KafkaStreamsDefaultConfiguration.DEFAULT_STREAMS_CONFIG_BEAN_NAME)
    public KafkaStreamsConfiguration kStreamsConfigs() {
        Map<String, Object> props = new HashMap<>();
        props.put(org.apache.kafka.clients.consumer.ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(org.apache.kafka.streams.StreamsConfig.APPLICATION_ID_CONFIG, "todo-streams-app");
        props.put(org.apache.kafka.streams.StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(org.apache.kafka.streams.StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, JsonSerde.class);
        return new KafkaStreamsConfiguration(props);
    }

    // Example stream: count completed todos by collectionId and write counts to another topic
    @Bean
    public KStream<String, Long> todoCompletedCounts(StreamsBuilder builder) {
        JsonSerde<TodoEvent> todoSerde = new JsonSerde<>(TodoEvent.class);

        KStream<String, TodoEvent> stream = builder.stream(KafkaTopics.TODO_EVENTS, Consumed.with(Serdes.String(), todoSerde));

        KStream<String, Long> counts = stream
                .filter((k, v) -> v != null && v.isCompleted())
                .map((k, v) -> KeyValue.pair(v.getCollectionId() != null ? v.getCollectionId().toString() : "_none_", v))
                .groupByKey(Grouped.with(Serdes.String(), todoSerde))
                .count(Materialized.as("completed-counts-store"))
                .toStream();

        counts.to("todo-completed-counts", Produced.with(Serdes.String(), Serdes.Long()));
        return counts;
    }
}

