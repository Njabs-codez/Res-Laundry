package com.college.backend.services;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.college.backend.models.Resident;
import com.college.backend.repositories.ResidentRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {
    @Value("${jwt.secret}")
    private String key;

    private final ResidentRepository residentRepo;

    JWTService(ResidentRepository residentRepo) {
        this.residentRepo = residentRepo;
    }

    public String generateToken(Integer studentNumber) {
        Map<String, Object> claims = new HashMap<>();
        int ttl = 1 * 60 * 60 * 1000;
        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(String.valueOf(studentNumber))
                .id(UUID.randomUUID().toString())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + ttl))
                .and()
                .signWith(getKey())
                .compact();
                
    }

    public Integer extractStudentNumber(String token) {
        String studentNumber = extractClaim(token, Claims::getSubject);
        return Integer.valueOf(studentNumber);
    }

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(key.getBytes(StandardCharsets.UTF_8));
    }

    private <T> T extractClaim(String token, Function<Claims, T> resolver){
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDeets) {
        Integer studentNumber = extractStudentNumber(token);
        Resident resident = residentRepo.findById(studentNumber).orElse(null);
        
        return !isTokenExpired(token) && 
        resident != null && 
        userDeets.getUsername().equals(String.valueOf(resident.getStudentNumber()));
    }

    private boolean isTokenExpired(String token) {
        Date expiry = extractClaim(token, Claims::getExpiration);
        return expiry.before(new Date());
    }
}
