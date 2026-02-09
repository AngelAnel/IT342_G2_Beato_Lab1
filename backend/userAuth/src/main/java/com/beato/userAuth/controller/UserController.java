package com.beato.userAuth.controller;

import com.beato.userAuth.model.User;
import com.beato.userAuth.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public User me() {
        return userRepository.findAll().get(0);
    }
}
