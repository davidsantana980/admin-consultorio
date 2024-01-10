package com.consultorio.api.modelos;

import com.consultorio.api.servicio.ImplementacionDelServicioDeArchivos;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "historias")
public class Historia {
    @Id
    @Column(name = "id_historia")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int idHistoria;

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
        this.idPaciente = paciente.getIdPaciente();
    }

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id_paciente", insertable = false, updatable = false)
    @JsonIgnore
    private Paciente paciente;

    @Column(name = "id_paciente", insertable = false)
    @JsonIgnore
    int idPaciente;

    @GeneratedValue
    @Column(name = "url_documento_historia")
    String urlDocumentoHistoria;

    @Column(name = "nombre_documento")
    String nombreDocumentoHistoria;

    public Historia() {
    }

    public Historia(int idHistoria, int idPaciente, String urlDocumentoHistoria) {
        this.idHistoria = idHistoria;
//        this.idPaciente = idPaciente;
        this.urlDocumentoHistoria = urlDocumentoHistoria;
    }

    public Historia(int idPaciente, String urlDocumentoHistoria) {
//        this.idPaciente = idPaciente;
        this.urlDocumentoHistoria = urlDocumentoHistoria;
    }

    public int getIdHistoria() {
        return idHistoria;
    }

    public void setIdHistoria(int idHistoria) {
        this.idHistoria = idHistoria;
    }

    public int getIdPaciente() {
        return paciente.getIdPaciente();
    }

//    public void setIdPaciente(int idPaciente) {
//        this.idPaciente = idPaciente;
//    }

    public String getUrlDocumentoHistoria() {
        return urlDocumentoHistoria;
    }

    public void setUrlDocumentoHistoria(String documento_historia) {
        this.urlDocumentoHistoria = documento_historia;
    }

    public String getNombreDocumentoHistoria() {
        return nombreDocumentoHistoria;
    }

    public void setNombreDocumentoHistoria(String nombreDocumentoHistoria) {
        this.nombreDocumentoHistoria = nombreDocumentoHistoria;
    }

    @PreRemove
    public void borraDocumentoHistoria(){
        String nombre = this.getNombreDocumentoHistoria();

        ImplementacionDelServicioDeArchivos servicioDeArchivos = new ImplementacionDelServicioDeArchivos();
        servicioDeArchivos.init("Historias");

        servicioDeArchivos.borrar(nombre);
    }
}
