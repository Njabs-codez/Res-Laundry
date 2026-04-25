package com.college.backend;


import java.util.Objects;

public class Machine {
    private Integer number;
    private MachineType type;
    private Integer usedBy;

    public Machine(Integer number, Integer usedBy, MachineType type) {
        this.number = number;
        this.usedBy = usedBy;
        this.type = type;
    }

    public MachineType getType() {
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
