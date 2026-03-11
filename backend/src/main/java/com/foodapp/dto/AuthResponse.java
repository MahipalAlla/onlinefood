package com.foodapp.dto;

public record AuthResponse(
    String token,
    String email,
    String fullName,
    String role
) {}
