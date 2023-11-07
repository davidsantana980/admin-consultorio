package com.consultorio.api.modelos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "citas")
public class Cita {
    @Id
    @Column(name = "id_cita", insertable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idCita;

    @Column(name = "id_paciente", updatable = false, insertable = false)
    @JsonIgnore
    int idPaciente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_paciente")
    @JsonIgnore
    private Paciente paciente;

    @Column(name = "fecha_cita", columnDefinition = "DATE")
    LocalDate fechaCita;

    @OneToMany(mappedBy = "cita")
    private List<Estudio> estudios;

    public List<Estudio> getEstudios() {
        return estudios;
    }

    public void setEstudios(List<Estudio> estudios) {
        this.estudios = estudios;
    }

    public Cita() {
    }

    public Cita(int idCita, int idPaciente, LocalDate fechaCita) {
        this.idCita = idCita;
        this.idPaciente = idPaciente;
        this.fechaCita = fechaCita;
    }

    public Cita(int idPaciente, LocalDate fechaCita) {
        this.idPaciente = idPaciente;
        this.fechaCita = fechaCita;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
        this.idPaciente = paciente.getIdPaciente();
    }

    public Integer getIdCita() {
        return idCita;
    }

    public void setIdCita(Integer idCita) {
        this.idCita = idCita;
    }

    public int getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(int idPaciente) {
        this.idPaciente = idPaciente;
    }

    public LocalDate getFechaCita() {
        return fechaCita;
    }

    public void setFechaCita(LocalDate fechaCita) {
        this.fechaCita = fechaCita;
    }
}
