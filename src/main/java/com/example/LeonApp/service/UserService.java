package com.example.LeonApp.service;

import com.example.LeonApp.entity.User;
import com.example.LeonApp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;

    public List<User> getAllPersons() {
        return repository.findAll();
    }

    public void deleteAllPersons() {
        repository.deleteAll();
    }

    public void deleteById(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("User not found");
        }

        repository.deleteById(id);
    }
}