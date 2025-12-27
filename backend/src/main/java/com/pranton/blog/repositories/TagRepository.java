package com.pranton.blog.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pranton.blog.entity.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, UUID> {
}
