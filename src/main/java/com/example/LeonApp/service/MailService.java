package com.example.LeonApp.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.SneakyThrows;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class MailService {
    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @SneakyThrows
    public void sendCode(String email, String code) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

            String html = loadHtml()
                    .replace("{{code}}", code);

            helper.setTo(email);
            helper.setSubject("Your Verification Code");
            helper.setText(html, true); // TRUE = HTML

            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send HTML email", e);
        }
    }

    @SneakyThrows
    private String loadHtml() {
        return new String(
                Objects.requireNonNull(getClass().getClassLoader().getResourceAsStream("templates/verification.html")).readAllBytes()
        );
    }
}
