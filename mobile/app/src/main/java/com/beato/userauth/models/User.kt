package com.beato.userauth.models

data class User(
    val id: Long,
    val username: String,
    val email: String,
    val firstName: String,
    val lastName: String
)