package com.example.LeonApp.repository;

import com.example.LeonApp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

//    @Query(value = "SELECT * FROM person WHERE password = :password", nativeQuery = true)
//    User findByPassword(@Param("password") String password);

//    @Query(value = "SELECT * FROM person WHERE email = :email", nativeQuery = true)
    boolean existsByEmail(@Param("email") String email);

    Optional<User> findByEmail(String email);
}
