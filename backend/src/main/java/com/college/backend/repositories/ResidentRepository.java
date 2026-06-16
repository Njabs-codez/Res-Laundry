package com.college.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.college.backend.models.Resident;

public interface ResidentRepository extends JpaRepository<Resident, String>{}
