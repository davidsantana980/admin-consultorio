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
    @MapsId
    @JoinColumn(name = "id_cita", insertable = false, updatable = false)
    @JsonIgnore
    private Cita cita;

    @Column(name = "id_cita", insertable = false)
    @JsonIgnore
    int idCita;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId
    @JoinColumn(name = "id_tipo_estudio", insertable = false, updatable = false)
    private TipoDeEstudio tipoDeEstudio;

    @Column(name = "id_tipo_estudio", insertable = false)
    @JsonIgnore
    int tipoEstudio;

    public Cita getCita() {
        return cita;
    }

    public void setCita(Cita cita) {
        this.cita = cita;
    }

    @Column(name = "notas_estudio")
    String notasEstudio;

    public Estudio() {
    }

    public Estudio(int idEstudio, int idCita, int tipoEstudio, String notasEstudio) {
        this.idEstudio = idEstudio;
        this.idCita = idCita;
        this.tipoEstudio = tipoEstudio;
        this.notasEstudio = notasEstudio;
    }

    public Estudio(int idCita, int tipoEstudio, String notasEstudio) {
        this.idCita = idCita;
        this.tipoEstudio = tipoEstudio;
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

    public int getTipoEstudio() {
        return tipoEstudio;
    }

    public void setTipoEstudio(int tipoEstudio) {
        this.tipoEstudio = tipoEstudio;
    }

    public String getNotasEstudio() {
        return notasEstudio;
    }

    public void setNotasEstudio(String notasEstudio) {
        this.notasEstudio = notasEstudio;
    }
}

@Entity
@Table(name = "tipos_estudio")
class TipoDeEstudio{
    @Id
    @Column(name = "id_tipo_estudio")
    int idEstudio;

    @OneToMany(mappedBy = "tipoDeEstudio", cascade = CascadeType.ALL)
//    @Column(name = "id_tipo_estudio")
    @JsonIgnore
    private List<Estudio> estudioSet;

    @Column(name = "nombre_tipo")
    String nombreTipo;

    public int getIdEstudio() {
        return idEstudio;
    }

    public void setIdEstudio(int idEstudio) {
        this.idEstudio = idEstudio;
    }

//    public List<Estudio> getEstudioSet() {
//        return estudioSet;
//    }
//
//    public void setEstudioSet(List<Estudio> estudioSet) {
//        this.estudioSet = estudioSet;
//    }

    public String getNombreTipo() {
        return nombreTipo;
    }

    public void setNombreTipo(String nombreTipo) {
        this.nombreTipo = nombreTipo;
    }
}