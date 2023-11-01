package com.consultorio.api.modelos;

public class Estudio {
    int id_estudio;
    int id_cita;
    int tipo_estudio;
    String notas_estudio;

    public Estudio() {
    }

    public Estudio(int id_estudio, int id_cita, int tipo_estudio, String notas_estudio) {
        this.id_estudio = id_estudio;
        this.id_cita = id_cita;
        this.tipo_estudio = tipo_estudio;
        this.notas_estudio = notas_estudio;
    }

    public Estudio(int id_cita, int tipo_estudio, String notas_estudio) {
        this.id_cita = id_cita;
        this.tipo_estudio = tipo_estudio;
        this.notas_estudio = notas_estudio;
    }

    public int getId_estudio() {
        return id_estudio;
    }

    public void setId_estudio(int id_estudio) {
        this.id_estudio = id_estudio;
    }

    public int getId_cita() {
        return id_cita;
    }

    public void setId_cita(int id_cita) {
        this.id_cita = id_cita;
    }

    public int getTipo_estudio() {
        return tipo_estudio;
    }

    public void setTipo_estudio(int tipo_estudio) {
        this.tipo_estudio = tipo_estudio;
    }

    public String getNotas_estudio() {
        return notas_estudio;
    }

    public void setNotas_estudio(String notas_estudio) {
        this.notas_estudio = notas_estudio;
    }
}
