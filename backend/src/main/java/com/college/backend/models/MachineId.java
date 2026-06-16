package com.college.backend.models;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class MachineId implements Serializable{
    private Integer number;
    private String type;
}
