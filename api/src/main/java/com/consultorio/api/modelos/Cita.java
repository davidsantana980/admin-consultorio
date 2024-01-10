package com.consultorio.api.modelos;

import com.consultorio.api.servicio.ImplementacionDelServicioDeArchivos;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "citas")
public class Cita {
    @Id
    @Column(name = "id_cita")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer idCita;

    @Column(name = "id_paciente", updatable = false, insertable = false)
    @JsonIgnore
    int idPaciente;

    @Column(name = "fecha_cita", columnDefinition = "DATE")
    LocalDate fechaCita;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_paciente")
    @JsonIgnore
    private Paciente paciente;

    @OneToMany(mappedBy = "cita", cascade = CascadeType.ALL)
    private List<Estudio> estudios;

    public List<Estudio> getEstudios() {
        return estudios;
    }

    public void setEstudios(List<Estudio> estudios) {
        this.estudios = estudios;
    }

    public Cita() {
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
        this.idPaciente = paciente.getIdPaciente();
    }

    @PreRemove
    public void borraDocumentosEstudios(){
        List<Estudio> estudios = this.getEstudios();
        ImplementacionDelServicioDeArchivos servicioDeArchivos = new ImplementacionDelServicioDeArchivos();
        servicioDeArchivos.init("Estudios");

        estudios.forEach(estudio -> {
            servicioDeArchivos.borrar(estudio.getNombreDocumentoEstudio());
        });
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
