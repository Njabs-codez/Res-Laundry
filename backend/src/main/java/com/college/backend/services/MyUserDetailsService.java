package com.college.backend.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.college.backend.models.Resident;
import com.college.backend.models.UserDetailImpl;
import com.college.backend.repositories.ResidentRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private final ResidentRepository residentRepo;

    MyUserDetailsService(ResidentRepository residentRepo) {
        this.residentRepo = residentRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new UserDetailImpl(null);
    }

    public UserDetails loadUserByStudentNumber(Integer userId) throws Exception {
        Resident user = residentRepo.findById(userId).orElse(null);

        if(user == null) 
            throw new Exception(userId + "does not exist");

        return new UserDetailImpl(user);
    }

}