package com.college.backend;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class MachineUsage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studentNumber")
    private Resident resident;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "number")
    private Machine machine;

    private LocalDateTime timeIn;

    private Integer cycleDuration;
}
