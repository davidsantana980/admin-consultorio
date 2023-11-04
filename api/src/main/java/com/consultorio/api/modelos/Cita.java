package com.consultorio.api.modelos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "citas")
public class Cita {
    @Id
    @Column(name = "id_cita")
    @GeneratedValue(strategy = GenerationType.AUTO)
    int idCita;

    @Column(name = "id_paciente", insertable = false)
    @JsonIgnore
    int idPaciente;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id_paciente", insertable = false, updatable = false)
    @JsonIgnore
    private Paciente paciente;

    @GeneratedValue
    @Column(name = "fecha_cita", columnDefinition = "DATE")
    Date fechaCita;

    @OneToMany(mappedBy = "cita", cascade = CascadeType.ALL)
    private List<Estudio> estudios;

    public Cita() {
    }

    public Cita(int idCita, int idPaciente, Date fechaCita) {
        this.idCita = idCita;
        this.idPaciente = idPaciente;
        this.fechaCita = fechaCita;
    }

    public Cita(int idPaciente, Date fechaCita) {
        this.idPaciente = idPaciente;
        this.fechaCita = fechaCita;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
//        this.idPaciente = paciente.getIdPaciente();
    }


    public int getIdCita() {
        return idCita;
    }

    public void setIdCita(int idCita) {
        this.idCita = idCita;
    }

    public int getIdPaciente() {
        return idPaciente;
    }

//    public void setIdPaciente(int idPaciente) {
//        this.idPaciente = idPaciente;
//    }

    public Date getFechaCita() {
        return fechaCita;
    }

    public void setFechaCita(Date fechaCita) {
        this.fechaCita = fechaCita;
    }
}
