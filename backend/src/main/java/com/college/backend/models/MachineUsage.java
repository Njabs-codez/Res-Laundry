package com.college.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class MachineUsage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studentNumber")
    private Resident resident;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
        @JoinColumn(name = "machineNumber", referencedColumnName = "number"),
        @JoinColumn(name = "machineType", referencedColumnName = "number")
    })
    private Machine machine;

    private LocalDateTime timeIn;
    private Integer cycleDuration;
}
