package com.college.backend;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class Machine {

    @Id
    private Integer number;
    private String type; // Washer or Dryer
    private Integer usedBy;

    public Machine(Integer number, Integer usedBy, String type) {
        this.number = number;
        this.usedBy = usedBy;
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
