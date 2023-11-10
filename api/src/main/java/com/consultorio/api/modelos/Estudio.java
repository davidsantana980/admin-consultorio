package com.consultorio.api.modelos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

@Entity
@Table(name = "estudios")
public class Estudio {
    @Id
    @Column(name = "id_estudio")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idEstudio;

    @Column(name = "id_cita", insertable = false, updatable = false)
    @JsonIgnore
    int idCita;

    @Column(name = "url_notas_estudio")
    String urlNotasEstudio;

    @Column(name = "id_tipo_estudio", insertable = false, updatable = false)
    @JsonIgnore
    Integer idTipoEstudio;

    @Column(name = "nombre_documento")
    private String nombreDocumentoEstudio;

    @Transient
    @JsonIgnore
    private MultipartFile archivoEstudio;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tipo_estudio")
    private TipoDeEstudio tipoDeEstudio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cita")
    @JsonIgnore
    private Cita cita;

    public Estudio() {
    }

    public MultipartFile getArchivoEstudio() {
        return archivoEstudio;
    }

    public void setArchivoEstudio(MultipartFile archivoEstudio) {
        this.archivoEstudio = archivoEstudio;
    }

    public TipoDeEstudio getTipoDeEstudio() {
        return tipoDeEstudio;
    }

    public void setTipoDeEstudio(TipoDeEstudio tipoDeEstudio) {
        this.tipoDeEstudio = tipoDeEstudio;
        this.idTipoEstudio = tipoDeEstudio.getIdTipoEstudio();
    }

    public Cita getCita() {
        return cita;
    }

    public void setCita(Cita cita) {
        this.cita = cita;
        this.idCita = cita.getIdCita();
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

    public String getUrlNotasEstudio() {
        return urlNotasEstudio;
    }

    public void setUrlNotasEstudio(String notasEstudio) {
        this.urlNotasEstudio = notasEstudio;
    }

    public String getNombreDocumentoEstudio() {
        return nombreDocumentoEstudio;
    }

    public void setNombreDocumentoEstudio(String nombre_documento) {
        this.nombreDocumentoEstudio = nombre_documento;
    }
}

