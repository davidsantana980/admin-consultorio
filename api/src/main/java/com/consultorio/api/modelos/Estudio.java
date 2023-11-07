package com.consultorio.api.modelos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "estudios")
public class Estudio {
    @Id
    @Column(name = "id_estudio")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idEstudio;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cita")
    @JsonIgnore
    private Cita cita;

    @Column(name = "id_cita", insertable = false, updatable = false)
    @JsonIgnore
    int idCita;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tipo_estudio")
    private TipoDeEstudio tipoDeEstudio;

    public TipoDeEstudio getTipoDeEstudio() {
        return tipoDeEstudio;
    }

    public void setTipoDeEstudio(TipoDeEstudio tipoDeEstudio) {
        this.tipoDeEstudio = tipoDeEstudio;
        this.idTipoEstudio = tipoDeEstudio.getIdTipoEstudio();
    }

    @Column(name = "id_tipo_estudio", insertable = false, updatable = false)
    @JsonIgnore
    Integer idTipoEstudio;

    public Cita getCita() {
        return cita;
    }

    public void setCita(Cita cita) {
        this.cita = cita;
        this.idCita = cita.getIdCita();
    }

    @Column(name = "notas_estudio")
    String notasEstudio;

    public Estudio() {
    }

    public Estudio(int idEstudio, int idCita, int idTipoEstudio, String notasEstudio) {
        this.idEstudio = idEstudio;
//        this.idCita = idCita;
        this.idTipoEstudio = idTipoEstudio;
        this.notasEstudio = notasEstudio;
    }

    public Estudio(int idCita, int idTipoEstudio, String notasEstudio) {
//        this.idCita = idCita;
        this.idTipoEstudio = idTipoEstudio;
        this.notasEstudio = notasEstudio;
    }

    public int getIdEstudio() {
        return idEstudio;
    }

    public void setIdEstudio(int idEstudio) {
        this.idEstudio = idEstudio;
    }

    public int getIdCita() {
        return idCita;
    }

    public void setIdCita(int idCita) {
        this.idCita = idCita;
    }

    public Integer getIdTipoEstudio() {
        return idTipoEstudio;
    }

    public void setIdTipoEstudio(Integer tipoEstudio) {
        this.idTipoEstudio = tipoEstudio;
    }

    public String getNotasEstudio() {
        return notasEstudio;
    }

    public void setNotasEstudio(String notasEstudio) {
        this.notasEstudio = notasEstudio;
    }
}

