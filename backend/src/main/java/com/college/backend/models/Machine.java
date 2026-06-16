package com.college.backend.models;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class Machine {
    @EmbeddedId
    private MachineId id;
}
