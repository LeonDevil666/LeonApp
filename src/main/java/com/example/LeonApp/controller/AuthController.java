package com.example.LeonApp.controller;

import com.example.LeonApp.dto.request.LoginRequestDTO;
import com.example.LeonApp.dto.request.RegisterRequestDTO;
import com.example.LeonApp.dto.response.UserResponseDTO;
import com.example.LeonApp.entity.User;
import com.example.LeonApp.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService service;

    @CrossOrigin(origins = "http://localhost:5500")
    @PostMapping(value = "/login")
    public UserResponseDTO login(@Valid @RequestBody LoginRequestDTO dto) {
        return service.login(dto);
    }

    @PostMapping(value = "/register")
    public UserResponseDTO register
            (@Valid @RequestBody RegisterRequestDTO dto) {
        return service.register(dto);
    }
}
