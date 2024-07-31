import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

const ModaleModificationPret = ({ loan, onSave, onCancel }) => {
  const [numCompte, setNumCompte] = useState("");
  const [nomClient, setNomClient] = useState("");
  const [nomBanque, setNomBanque] = useState("");
  const [montantPret, setMontantPret] = useState("");
  const [datePret, setDatePret] = useState("");
  const [tauxPret, setTauxPret] = useState("");

  useEffect(() => {
    setNumCompte(loan.numCompte);
    setNomClient(loan.nomClient);
    setNomBanque(loan.nomBanque);
    setMontantPret(loan.montantPret.toString());
    setDatePret(formatDate(loan.datePret)); // Utilisation d'une fonction pour formater la date
    setTauxPret(loan.tauxPret.toString());
  }, [loan]);

  const handleSave = () => {
    if (
      !numCompte ||
      !nomClient ||
      !nomBanque ||
      !montantPret ||
      !datePret ||
      !tauxPret
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const updatedLoan = {
      ...loan,
      numCompte,
      nomClient,
      nomBanque,
      montantPret: parseInt(montantPret),
      datePret: new Date(datePret).toISOString().split("T")[0], // Formater la date pour l'envoi au backend
      tauxPret: parseInt(tauxPret),
    };

    onSave(updatedLoan);

    // Réinitialisation des champs du formulaire après sauvegarde
    setNumCompte("");
    setNomClient("");
    setNomBanque("");
    setMontantPret("");
    setDatePret("");
    setTauxPret("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Modifier le Prêt
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block mb-1">Numéro de Compte</label>
            <input
              type="text"
              value={numCompte}
              onChange={(e) => setNumCompte(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Nom du Client</label>
            <input
              type="text"
              value={nomClient}
              onChange={(e) => setNomClient(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Nom de la Banque</label>
            <input
              type="text"
              value={nomBanque}
              onChange={(e) => setNomBanque(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Montant du Prêt</label>
            <input
              type="number"
              value={montantPret}
              onChange={(e) => setMontantPret(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Date du Prêt</label>
            <input
              type="date"
              value={datePret}
              onChange={(e) => setDatePret(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Taux du Prêt</label>
            <input
              type="number"
              value={tauxPret}
              onChange={(e) => setTauxPret(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 p-2 rounded flex items-center justify-center w-full hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded flex items-center justify-center w-full hover:bg-blue-600"
          >
            <FaEdit className="mr-2" /> Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModaleModificationPret;
