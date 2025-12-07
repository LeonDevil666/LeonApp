package com.example.LeonApp.controller;

import com.example.LeonApp.entity.User;
import com.example.LeonApp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api")
public class UserController {

    private final UserService service;

    @GetMapping(value = "/get-all")
    public List<User> getAllPersons() {
        return service.getAllPersons();
    }


    @DeleteMapping(value = "/delete_all")
    public void deleteAllPersons() {
        service.deleteAllPersons();

    }
}
