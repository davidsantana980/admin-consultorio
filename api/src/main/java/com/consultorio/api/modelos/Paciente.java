package com.consultorio.api.modelos;

import jakarta.persistence.*;

@Entity
@Table(name = "pacientes")
public class Paciente {

    @Id
    @Column(name = "id_paciente")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPaciente;

    @Column(name = "nombre_paciente", nullable = false)
    private String nombrePaciente;

    @Column(name = "apellido_paciente", nullable = false)
    private String apellidoPaciente;

    @Column(name = "cedula_paciente", nullable = false)
    private String cedulaPaciente;

    @Column(name = "telefono_paciente", nullable = true)
    private String telefonoPaciente;

    public Paciente() {
    }

    public Paciente(Integer idPaciente, String nombrePaciente, String apellidoPaciente, String cedulaPaciente, String telefonoPaciente) {
        this.idPaciente = idPaciente;
        this.nombrePaciente = nombrePaciente;
        this.apellidoPaciente = apellidoPaciente;
        this.cedulaPaciente = cedulaPaciente;
        this.telefonoPaciente = telefonoPaciente;
    }

    public Paciente(String nombrePaciente, String apellidoPaciente, String cedulaPaciente, String telefonoPaciente) {
        this.nombrePaciente = nombrePaciente;
        this.apellidoPaciente = apellidoPaciente;
        this.cedulaPaciente = cedulaPaciente;
        this.telefonoPaciente = telefonoPaciente;
    }

    public Integer getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(Integer idPaciente) {
        this.idPaciente = idPaciente;
    }

    public String getNombrePaciente() {
        return nombrePaciente;
    }

    public void setNombrePaciente(String nombrePaciente) {
        this.nombrePaciente = nombrePaciente;
    }

    public String getApellidoPaciente() {
        return apellidoPaciente;
    }

    public void setApellidoPaciente(String apellidoPaciente) {
        this.apellidoPaciente = apellidoPaciente;
    }

    public String getCedulaPaciente() {
        return cedulaPaciente;
    }

    public void setCedulaPaciente(String cedulaPaciente) {
        this.cedulaPaciente = cedulaPaciente;
    }

    public String getTelefonoPaciente() {
        return telefonoPaciente;
    }

    public void setTelefonoPaciente(String telefonoPaciente) {
        this.telefonoPaciente = telefonoPaciente;
    }
}