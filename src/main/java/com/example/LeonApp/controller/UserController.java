package com.example.LeonApp.controller;

import com.example.LeonApp.entity.User;
import com.example.LeonApp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/user")
public class UserController {

    private final UserService service;

    @GetMapping(value = "/get-all")
    public List<User> getAllPersons() {
        return service.getAllPersons();
    }


    @DeleteMapping(value = "/delete-all")
    public ResponseEntity<?> deleteAllPersons() {
        service.deleteAllPersons();
        return ResponseEntity.ok("All users has been successfully deleted.");

    }

    @DeleteMapping(value = "/delete-{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.ok("User has been successfully deleted.");
    }
}
