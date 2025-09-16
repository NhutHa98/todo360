package com.todo360.common.messaging;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRecordRepository extends JpaRepository<EventRecord, Long> {
    List<EventRecord> findByStatusOrderByOccurredAtAsc(EventStatus status, Pageable pageable);
}
