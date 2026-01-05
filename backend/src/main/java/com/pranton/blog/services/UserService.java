package com.pranton.blog.services;

import java.util.UUID;

import com.pranton.blog.entity.User;

public interface UserService {
    User getUserById(UUID id);
}