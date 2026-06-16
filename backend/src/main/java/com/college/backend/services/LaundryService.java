package com.college.backend.services;


import org.springframework.stereotype.Service;
import com.college.backend.dtos.AuthResponseDTO;
import com.college.backend.dtos.LoginDTO;
import com.college.backend.dtos.RegisterDTO;
import com.college.backend.repositories.MachineRepository;
import com.college.backend.repositories.MachineUsageRepository;
import com.college.backend.repositories.ResidentRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LaundryService {

    private final JWTService jwtService;
    private final ResidentRepository residentRepo;
    private final MachineRepository machineRepo;
    private final MachineUsageRepository muRepo;


    public AuthResponseDTO register(RegisterDTO residentDetails){
        // TODO: Remember to check that student numbers are at least 8 chars long

    }

    public AuthResponseDTO authenticate(LoginDTO residentDetails){
        // TODO: Remember to check that student numbers are at least 8 chars long
    }

    private String sanitise(String value){
        return "";
    }

}
