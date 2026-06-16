package com.college.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.college.backend.models.MachineUsage;

public interface MachineUsageRepository
 extends JpaRepository<MachineUsage, String>{}
