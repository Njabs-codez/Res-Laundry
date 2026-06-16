package com.college.backend.services;


import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.college.backend.dtos.AuthResponseDTO;
import com.college.backend.dtos.LoginDTO;
import com.college.backend.dtos.RegisterDTO;
import com.college.backend.models.Resident;
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
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public AuthResponseDTO register(RegisterDTO residentDetails){
        residentDetails = sanitise(residentDetails);

        if(residentRepo.existsById(residentDetails.studentNumber()))
            throw new DuplicateKeyException("A user associated with this Student number exists.");

        String accesstoken = jwtService.generateToken(
            residentDetails.studentNumber(), false);

        String refreshToken = jwtService.generateToken(
            residentDetails.studentNumber(), true);

        String password = encoder.encode(residentDetails.password());
        Resident collegeMan = new Resident(
            residentDetails.studentNumber(),
            residentDetails.phoneNumber(),
            residentDetails.firstName(),
            residentDetails.lastName(),
            residentDetails.roomNumber(),
            password,
            refreshToken
        );
        residentRepo.save(collegeMan);

        return new AuthResponseDTO(
            accesstoken,
            refreshToken,
            "Welcome Collegeman."
        );
    }

    public AuthResponseDTO authenticate(LoginDTO residentDetails) throws IllegalAccessException{
        String studentNumber = residentDetails.studentNumber().replaceAll("[^0-9]", "");
        String password = residentDetails.password();

        Resident collegeman = residentRepo.findById(studentNumber).orElse(null);
        
        if(collegeman == null)
            throw new UsernameNotFoundException("Student number does not exist.");
        
        if(!encoder.matches(password, collegeman.getPassword()))
            throw new IllegalAccessException("Password incorrect");

        String accesstoken = jwtService.generateToken(
            residentDetails.studentNumber(), 
            false
        );

        String refreshToken = jwtService.generateToken(
            residentDetails.studentNumber(),
            true
        );

        collegeman.setRefreshToken(refreshToken);
        residentRepo.save(collegeman);

        return new AuthResponseDTO(
            accesstoken,
            refreshToken,
            "Welcome back Collegeman."
        );
    }

    /*
        TODO: 
            Implement get available machines
            Implement machines in use
            Implement email sending
            Implement use machines
            Implement unuse machines
    */


    private String sanitise(String value){
        if (value == null) 
            return null;
        return value.strip()           
                .replaceAll("\\s+", " ")
                .replaceAll("[<>\"'%;()&+]", "");
    }

    public RegisterDTO sanitise(RegisterDTO dto) {
        return new RegisterDTO(
            dto.studentNumber().replaceAll("[^0-9]", ""),
            sanitise(dto.firstName()),
            sanitise(dto.lastName()),
            dto.password(),
            sanitise(dto.roomNumber()),
            sanitise(dto.phoneNumber())
        );
    }


}
