package com.college.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class Resident {
    @Id
    private String studentNumber;
    private String phoneNumber;
    private String firstName;
    private String lastName;
    private String roomNumber;
    private String password;
    private String refreshToken;
}
