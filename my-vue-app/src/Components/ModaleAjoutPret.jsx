import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

const ModaleAjoutPret = ({ isOpen, onAdd, onCancel }) => {
  const [numCompte, setNumCompte] = useState("");
  const [nomClient, setNomClient] = useState("");
  const [nomBanque, setNomBanque] = useState("");
  const [montantPret, setMontantPret] = useState("");
  const [datePret, setDatePret] = useState("");
  const [tauxPret, setTauxPret] = useState("");
  const [montantTotal, setMontantTotal] = useState(0);

  useEffect(() => {
    const total = calculateTotal(
      parseInt(montantPret) || 0,
      parseInt(tauxPret) || 0
    );
    setMontantTotal(total);
  }, [montantPret, tauxPret]);

  const handleAdd = () => {
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

    const formattedDate = new Date(datePret).toISOString().split("T")[0]; // Convertir en format YYYY-MM-DD
    const newLoan = {
      numCompte,
      nomClient,
      nomBanque,
      montantPret: parseInt(montantPret),
      datePret: formattedDate,
      tauxPret: parseInt(tauxPret),
      montantTotal,
    };

    onAdd(newLoan);

    // Clear form fields
    setNumCompte("");
    setNomClient("");
    setNomBanque("");
    setMontantPret("");
    setDatePret("");
    setTauxPret("");
  };

  const calculateTotal = (principal, rate) => {
    return principal + principal * (rate / 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">Ajouter un Prêt</h2>
        <div className="mb-4">
          <label className="block mb-2">Numéro de Compte</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={numCompte}
            onChange={(e) => setNumCompte(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Nom du Client</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={nomClient}
            onChange={(e) => setNomClient(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Nom de la Banque</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={nomBanque}
            onChange={(e) => setNomBanque(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Montant du Prêt</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={montantPret}
            onChange={(e) => setMontantPret(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Date du Prêt</label>
          <input
            type="date" // Utilisation de type="date"
            className="w-full p-2 border border-gray-300 rounded"
            value={datePret}
            onChange={(e) => setDatePret(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Taux du Prêt</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={tauxPret}
            onChange={(e) => setTauxPret(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Montant Total</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={montantTotal}
            readOnly
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white p-2 rounded flex items-center hover:bg-green-600 mr-2"
          >
            <FaPlus className="mr-1" /> Ajouter
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModaleAjoutPret;
