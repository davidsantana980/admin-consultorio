package com.consultorio.api.modelos;

import java.util.Date;

public class Cita {
    int id_cita;
    int id_paciente;
    Date fecha_cita;

    public Cita() {
    }

    public Cita(int id_cita, int id_paciente, Date fecha_cita) {
        this.id_cita = id_cita;
        this.id_paciente = id_paciente;
        this.fecha_cita = fecha_cita;
    }

    public Cita(int id_paciente, Date fecha_cita) {
        this.id_paciente = id_paciente;
        this.fecha_cita = fecha_cita;
    }

    public int getId_cita() {
        return id_cita;
    }

    public void setId_cita(int id_cita) {
        this.id_cita = id_cita;
    }

    public int getId_paciente() {
        return id_paciente;
    }

    public void setId_paciente(int id_paciente) {
        this.id_paciente = id_paciente;
    }

    public Date getFecha_cita() {
        return fecha_cita;
    }

    public void setFecha_cita(Date fecha_cita) {
        this.fecha_cita = fecha_cita;
    }
}
