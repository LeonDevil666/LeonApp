package com.example.LeonApp.mapper;

import com.example.LeonApp.dto.request.RegisterRequestDTO;
import com.example.LeonApp.dto.response.UserResponseDTO;
import com.example.LeonApp.entity.User;

public class UserMapper {
    
    public static User toEntity(RegisterRequestDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setSurname(dto.getSurname());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        
        return user;
    } 
    
    public static UserResponseDTO toDTO(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setSurname(user.getSurname());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());

        return dto;
    }
}
