package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        System.out.println("Nombre d'utilisateurs récupérés : " + users.size());
        for (User user : users) {
            System.out.println(user.getId() + " - " + user.getUsername());
            // Ajoutez d'autres attributs de l'utilisateur à afficher si nécessaire
        }
        return users;
    }

    // D'autres méthodes de service à ajouter si nécessaire
}
