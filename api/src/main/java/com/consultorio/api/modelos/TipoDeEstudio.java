package com.consultorio.api.modelos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "tipos_estudio")
public class TipoDeEstudio {
    @Id
    @Column(name = "id_tipo_estudio")
    int idTipoEstudio;

    @OneToMany(mappedBy = "tipoDeEstudio")
    @JsonIgnore
    private List<Estudio> estudioSet;

    @Column(name = "nombre_tipo")
    String nombreTipo;

    public int getIdTipoEstudio() {
        return idTipoEstudio;
    }

    public void setIdTipoEstudio(int idEstudio) {
        this.idTipoEstudio = idEstudio;
    }

    public List<Estudio> getEstudioSet() {
        return estudioSet;
    }

    public void setEstudioSet(List<Estudio> estudioSet) {
        this.estudioSet = estudioSet;
    }

    public String getNombreTipo() {
        return nombreTipo;
    }

    public void setNombreTipo(String nombreTipo) {
        this.nombreTipo = nombreTipo;
    }
}
