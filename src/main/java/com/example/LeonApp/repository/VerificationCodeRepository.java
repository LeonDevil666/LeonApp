package com.example.LeonApp.repository;

import com.example.LeonApp.entity.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {
    Optional<VerificationCode> findByUserId(Long userId);
    Optional<VerificationCode> findByCode(String code);
}
