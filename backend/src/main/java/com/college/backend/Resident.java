package com.college.backend;

import java.util.List;
import java.util.Objects;

public class Resident {
    private Integer studentNumber;
    private String phoneNumber;
    private String firstName;
    private String lastName;
    private String roomNumber;
    private String password;
    private List<Machine> machines;

    public Resident(){}

    public Resident(Integer studentNumber, String firstName, String lastName, String phoneNumber, String roomNumber, String password ) {
        this.roomNumber = roomNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.studentNumber = studentNumber;
        this.password = password;
    }

    public Integer getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(Integer studentNumber) {
        this.studentNumber = studentNumber;
    }

    public List<Machine> getMachines() {
        return machines;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Resident resident = (Resident) o;
        return Objects.equals(studentNumber, resident.studentNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(studentNumber);
    }
}
