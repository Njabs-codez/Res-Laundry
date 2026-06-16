package com.college.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.college.backend.models.Machine;

import java.util.ArrayList;
import java.util.List;

@RestController
public class LaundryController {

    @PostMapping("/register")
    public void registerResident(){}

    @PostMapping("/login")
    public void authenticateUser(){}

    @GetMapping("/available-machines")
    public List<Machine> getAvailableMachines(){ return new ArrayList<>();}

    @GetMapping("/machines-in-use")
    public List<Machine> getMachinesInUse(){return new ArrayList<>();}

    @PostMapping("/use-machines")
    public void useMachines(){}

}
