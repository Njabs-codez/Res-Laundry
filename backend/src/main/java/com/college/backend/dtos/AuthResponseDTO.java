package com.college.backend.dtos;

public record AuthResponseDTO(
    String accessToken,
    String refreshToken,
    String message
){}
