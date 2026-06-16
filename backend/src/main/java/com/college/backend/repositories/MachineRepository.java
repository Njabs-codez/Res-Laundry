package com.college.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.college.backend.models.Machine;

public interface MachineRepository extends JpaRepository<Machine, Integer>{}
