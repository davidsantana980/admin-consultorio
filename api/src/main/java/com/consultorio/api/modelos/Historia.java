package com.consultorio.api.modelos;

public class Historia {
    int id_historia;
    int id_paciente;
    String documento_historia;

    public Historia() {
    }

    public Historia(int id_historia, int id_paciente, String documento_historia) {
        this.id_historia = id_historia;
        this.id_paciente = id_paciente;
        this.documento_historia = documento_historia;
    }

    public Historia(int id_paciente, String documento_historia) {
        this.id_paciente = id_paciente;
        this.documento_historia = documento_historia;
    }

    public int getId_historia() {
        return id_historia;
    }

    public void setId_historia(int id_historia) {
        this.id_historia = id_historia;
    }

    public int getId_paciente() {
        return id_paciente;
    }

    public void setId_paciente(int id_paciente) {
        this.id_paciente = id_paciente;
    }

    public String getDocumento_historia() {
        return documento_historia;
    }

    public void setDocumento_historia(String documento_historia) {
        this.documento_historia = documento_historia;
    }
}
