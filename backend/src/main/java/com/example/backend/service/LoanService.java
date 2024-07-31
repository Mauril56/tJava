package com.example.backend.service;

import com.example.backend.entity.Loan;
import com.example.backend.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LoanService {

    private final LoanRepository loanRepository;

    @Autowired
    public LoanService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    // Méthode pour récupérer tous les prêts
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    // Méthode pour récupérer un prêt par son ID
    public Optional<Loan> getLoanById(Long id) {
        return loanRepository.findById(id);
    }

    // Méthode pour ajouter un nouveau prêt
    public Loan addLoan(Loan loan) {
        return loanRepository.save(loan);
    }

    // Méthode pour mettre à jour un prêt existant
    public Loan updateLoan(Loan loan) {
        return loanRepository.save(loan);
    }

    // Méthode pour supprimer un prêt par son ID
    public void deleteLoan(Long id) {
        loanRepository.deleteById(id);
    }
}
