package com.college.backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Machine {

    @Id
    private Integer number;
    private String type; // Washer or Dryer
}
