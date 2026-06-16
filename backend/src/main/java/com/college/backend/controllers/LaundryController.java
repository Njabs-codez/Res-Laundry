package com.college.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.college.backend.dtos.LoginDTO;
import com.college.backend.dtos.RegisterDTO;
import com.college.backend.services.LaundryService;

@RestController
@RequestMapping("/api")
public class LaundryController {

    private final LaundryService service;

    LaundryController(LaundryService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerResident(RegisterDTO residentDetails){
        
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateResident(LoginDTO loginDetails){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/available-machines")
    public ResponseEntity<?> getAvailableMachines(){ 
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/machines-in-use")
    public ResponseEntity<?> getMachinesInUse(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/use-machines")
    public ResponseEntity<?> useMachines(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
