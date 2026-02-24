package com.beato.userauth.models

data class AuthResponse(
    val token: String,
    val type: String = "Bearer",
    val id: Long,
    val username: String,
    val email: String
)