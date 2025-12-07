package com.example.LeonApp.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.format.annotation.NumberFormat;

@Data
public class RegisterRequestDTO {

    @NotBlank
    private String name;
    
    @NotBlank
    private String surname;
    
    @NotBlank
    private String username;
    
    @Email
    @NotBlank
    private String email;
    
    @NotBlank
    @Size(min = 8, max = 24)
    private String password;
    
    @NotBlank
    @NumberFormat
    @Size(min = 9, max = 11)
    private String phoneNumber;
}
