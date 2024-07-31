package com.example.backend.service;

import com.example.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> findByUsername(String username);

    List<User> findAll();
}
