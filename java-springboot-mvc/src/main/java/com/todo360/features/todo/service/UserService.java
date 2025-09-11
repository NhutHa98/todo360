package com.todo360.features.todo.service;

import com.todo360.features.todo.model.User;

public interface UserService {
    User save(User user);
    User findByUsername(String username);
}

