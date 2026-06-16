package com.college.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Resident {
    @Id
    private Integer studentNumber;
    private String phoneNumber;
    private String firstName;
    private String lastName;
    private String roomNumber;
    private String password;
   
    public Resident(Integer studentNumber, String firstName, String lastName, String phoneNumber, String roomNumber, String password ) {
        this.roomNumber = roomNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.studentNumber = studentNumber;
        this.password = password;
    }
}
