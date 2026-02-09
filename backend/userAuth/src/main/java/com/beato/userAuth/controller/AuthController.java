package com.beato.userAuth.controller;

import com.beato.userAuth.model.User;
import com.beato.userAuth.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody Map<String, String> body) {
        return userService.register(
                body.get("email"),
                body.get("password"),
                body.get("name")
        );
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> body) {
        Optional<User> user = userService.login(
                body.get("email"),
                body.get("password")
        );

        return user.isPresent() ? "Login successful" : "Invalid credentials";
    }
}
