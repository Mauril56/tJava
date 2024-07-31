package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "pret")
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String numCompte;
    private String nomClient;
    private String nomBanque;
    private int montantPret;
    private Date datePret;
    private int tauxPret;
    private int montantTotal;

    // Constructeurs
    public Loan() {
    }

    public Loan(String numCompte, String nomClient, String nomBanque, int montantPret, Date datePret, int tauxPret,
            int montantTotal) {
        this.numCompte = numCompte;
        this.nomClient = nomClient;
        this.nomBanque = nomBanque;
        this.montantPret = montantPret;
        this.datePret = datePret;
        this.tauxPret = tauxPret;
        this.montantTotal = montantTotal;
    }

    // Getters et setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumCompte() {
        return numCompte;
    }

    public void setNumCompte(String numCompte) {
        this.numCompte = numCompte;
    }

    public String getNomClient() {
        return nomClient;
    }

    public void setNomClient(String nomClient) {
        this.nomClient = nomClient;
    }

    public String getNomBanque() {
        return nomBanque;
    }

    public void setNomBanque(String nomBanque) {
        this.nomBanque = nomBanque;
    }

    public int getMontantPret() {
        return montantPret;
    }

    public void setMontantPret(int montantPret) {
        this.montantPret = montantPret;
    }

    public Date getDatePret() {
        return datePret;
    }

    public void setDatePret(Date datePret) {
        this.datePret = datePret;
    }

    public int getTauxPret() {
        return tauxPret;
    }

    public void setTauxPret(int tauxPret) {
        this.tauxPret = tauxPret;
    }

    public int getMontantTotal() {
        return montantTotal;
    }

    public void setMontantTotal(int montantTotal) {
        this.montantTotal = montantTotal;
    }

    @Override
    public String toString() {
        return "Loan{" +
                "id=" + id +
                ", numCompte='" + numCompte + '\'' +
                ", nomClient='" + nomClient + '\'' +
                ", nomBanque='" + nomBanque + '\'' +
                ", montantPret=" + montantPret +
                ", datePret=" + datePret +
                ", tauxPret=" + tauxPret +
                ", montantTotal=" + montantTotal +
                '}';
    }
}
