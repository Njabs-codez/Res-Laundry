package com.college.backend;


import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
public class Machine {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer number;
    private String type; // Washer or Dryer
    @OneToMany(mappedBy = "machine", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MachineUsage> usedBy;

    public Machine(Integer number, String type) {
        this.number = number;
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public Integer getNumber() {
        return number;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Machine machine = (Machine) o;
        return Objects.equals(number, machine.number) && type == machine.type;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(number);
    }
}
