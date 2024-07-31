package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http:localhost:3002") // Autorisation CORS pour l'origine de votre frontend
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Optional<User> user = userService.findByUsername(username);

        Map<String, String> response = new HashMap<>();
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            response.put("message", "Login successful");
        } else {
            response.put("message", "Invalid username or password");
        }
        return response;
    }
}
