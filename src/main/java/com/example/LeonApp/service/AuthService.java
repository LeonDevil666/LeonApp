package com.example.LeonApp.service;

import com.example.LeonApp.dto.request.LoginRequestDTO;
import com.example.LeonApp.dto.request.RegisterRequestDTO;
import com.example.LeonApp.dto.response.UserResponseDTO;
import com.example.LeonApp.entity.User;
import com.example.LeonApp.mapper.UserMapper;
import com.example.LeonApp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserResponseDTO register(RegisterRequestDTO dto) {
        if (repository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }

        User user = UserMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        repository.save(user);

        return UserMapper.toDTO(user);
    }

    public UserResponseDTO login(LoginRequestDTO dto) {
        User user = repository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return UserMapper.toDTO(user);
    }
}
