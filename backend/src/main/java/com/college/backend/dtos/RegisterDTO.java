package com.college.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterDTO(
    @NotNull(message = "Student number is a required field.")
    @NotBlank(message = "Student number cannot be blank.")
    @Size(min = 8, max = 8, message = "Student number must be 8 digits long.")
    String studentNumber,
    @NotNull(message = "First name is a required field.")
    @NotBlank(message = "First name cannot be blank.")
    @Size(min = 3, message = "First name must be at least 3 characters long.")
    String firstName,
    @NotNull(message = "Last name is a required field.")
    @NotBlank(message = "Last name cannot be blank.")
    @Size(min = 3, message = "Last name must be at least 3 characters long.")
    String lastName,
    @NotNull(message = "Password is a required field.")
    @NotBlank(message = "Password cannot be blank.")
    @Pattern(
        regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,}$",
        message = "Password must be at least 8 characters and contain at least one uppercase letter, number, and symbol."
    )
    String password,
    @NotNull(message = "Room number is a required field.")
    @NotBlank(message = "Room number cannot be blank.")
    @Size(min = 5, max = 6, message = "Room number must be 5-6 digits long.")
    String roomNumber,
    @NotNull(message = "Phone number is a required field.")
    @NotBlank(message = "Phone number cannot be blank.")
    @Size(min = 10, max = 10, message = "Phone number must be 10 digits long.")
    String phoneNumber
) {}
