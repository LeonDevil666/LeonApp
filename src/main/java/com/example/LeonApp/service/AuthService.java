package com.example.LeonApp.service;

import com.example.LeonApp.dto.request.LoginRequestDTO;
import com.example.LeonApp.dto.request.RegisterRequestDTO;
import com.example.LeonApp.dto.response.UserResponseDTO;
import com.example.LeonApp.entity.User;
import com.example.LeonApp.entity.VerificationCode;
import com.example.LeonApp.entity.enums.UserStatus;
import com.example.LeonApp.mapper.UserMapper;
import com.example.LeonApp.repository.UserRepository;
import com.example.LeonApp.repository.VerificationCodeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final VerificationCodeRepository codeRepository;

    private final MailService mailService;

    private final PasswordEncoder passwordEncoder;

    public UserResponseDTO register(RegisterRequestDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }

        User user = UserMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setStatus(UserStatus.NOT_VERIFIED);
        userRepository.save(user);

        String code = String.valueOf(100_000 + new Random().nextInt(900_000));

        VerificationCode verification = new VerificationCode();
        verification.setUserId(user.getId());
        verification.setCode(code);
        verification.setExpiresAt(LocalDateTime.now().plusMinutes(10));

        codeRepository.save(verification);

        mailService.sendCode(user.getEmail(), code);

        log.info("Verification code sent to email: {}", user.getEmail());

        return UserMapper.toDTO(user);
    }

    public UserResponseDTO login(LoginRequestDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        if (!(user.getStatus() == UserStatus.VERIFIED)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "EMAIL_NOT_VERIFIED");
        }

        return UserMapper.toDTO(user);
    }


    public void verify(String code) {

        VerificationCode v = codeRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Invalid code"));

        if (v.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Code expired");
        }

        User user = userRepository.findById(v.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus(UserStatus.VERIFIED);
        userRepository.save(user);

        codeRepository.delete(v);

        log.info("Email: {} verified successfully!", user.getEmail());
    }
}
