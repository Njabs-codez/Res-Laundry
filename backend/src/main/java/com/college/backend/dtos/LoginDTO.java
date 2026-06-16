package com.college.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record LoginDTO(
    @NotNull(message = "Student number is a required field.")
    @NotBlank(message = "Student number cannot be blank.")
    @Size(min = 8, max = 8, message = "Student number must 8 digits long.")
    String studentNumber,
    @Pattern(
        regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,}$",
        message = "Password must be at least 8 characters and contain at least one uppercase letter, number, and symbol"
    )
    String password
) {}
