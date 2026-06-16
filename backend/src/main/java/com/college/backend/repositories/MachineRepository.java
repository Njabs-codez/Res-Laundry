package com.college.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.college.backend.models.Machine;
import com.college.backend.models.MachineId;

public interface MachineRepository extends JpaRepository<Machine, MachineId>{}
