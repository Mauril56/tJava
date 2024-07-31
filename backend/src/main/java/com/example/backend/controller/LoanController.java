package com.example.backend.controller;

import com.example.backend.entity.Loan;
import com.example.backend.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pret")
public class LoanController {

    private final LoanService loanService;

    @Autowired
    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    // Endpoint pour récupérer tous les prêts
    @GetMapping
    public ResponseEntity<List<Loan>> getAllLoans() {
        List<Loan> loans = loanService.getAllLoans();
        return new ResponseEntity<>(loans, HttpStatus.OK);
    }

    // Endpoint pour récupérer un prêt par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Loan> getLoanById(@PathVariable("id") Long id) {
        Optional<Loan> loan = loanService.getLoanById(id);
        return loan.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint pour ajouter un prêt
    @PostMapping
    public ResponseEntity<Loan> addPret(@RequestBody Loan loan) {
        Loan addedLoan = loanService.addLoan(loan); // Assurez-vous d'avoir une méthode addLoan dans votre service
        return ResponseEntity.status(HttpStatus.CREATED).body(addedLoan);
    }

    // Endpoint pour mettre à jour un prêt existant
    @PutMapping("/{id}")
    public ResponseEntity<Loan> updateLoan(@PathVariable("id") Long id, @RequestBody Loan loan) {
        if (!loanService.getLoanById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        // Calculer montantTotal
        int montantTotal = (int) (loan.getMontantPret() * (1 + loan.getTauxPret() / 100.0));
        loan.setMontantTotal(montantTotal);
        loan.setId(id);

        Loan updatedLoan = loanService.updateLoan(loan);
        return ResponseEntity.ok(updatedLoan);
    }

    // Endpoint pour supprimer un prêt par son ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable("id") Long id) {
        if (!loanService.getLoanById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        loanService.deleteLoan(id);
        return ResponseEntity.noContent().build();
    }
}
