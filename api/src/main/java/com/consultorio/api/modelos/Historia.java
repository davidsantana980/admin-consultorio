package com.consultorio.api.modelos;

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
    @Column(name = "documento_historia")
    String documentoHistoria;

    public Historia() {
    }

    public Historia(int idHistoria, int idPaciente, String documentoHistoria) {
        this.idHistoria = idHistoria;
//        this.idPaciente = idPaciente;
        this.documentoHistoria = documentoHistoria;
    }

    public Historia(int idPaciente, String documentoHistoria) {
//        this.idPaciente = idPaciente;
        this.documentoHistoria = documentoHistoria;
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

    public String getDocumentoHistoria() {
        return documentoHistoria;
    }

    public void setDocumentoHistoria(String documento_historia) {
        this.documentoHistoria = documento_historia;
    }
}
