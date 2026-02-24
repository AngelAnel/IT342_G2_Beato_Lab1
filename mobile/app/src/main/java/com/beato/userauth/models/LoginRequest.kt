package com.beato.userauth.models

data class LoginRequest(
    val username: String,
    val password: String
)