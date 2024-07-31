import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ModaleAjoutPret from "../Components/ModaleAjoutPret";
import ModaleModificationPret from "../Components/ModaleModificationPret";
import axios from "axios";
import { format } from "date-fns"; // Importez la fonction de formatage de date

const Home = () => {
  const [loans, setLoans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editLoan, setEditLoan] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get("http://192.168.11.93:8080/api/pret");
      setLoans(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des prêts :", error);
    }
  };

  const handleAddLoan = async (newLoan) => {
    try {
      const response = await axios.post(
        "http://192.168.11.93:8080/api/pret",
        newLoan
      );
      setLoans([...loans, response.data]);
      setShowModal(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout du prêt :", error);
      alert("Erreur lors de l'ajout du prêt. Veuillez réessayer plus tard.");
    }
  };

  const handleEdit = (id) => {
    const loanToEdit = loans.find((loan) => loan.id === id);
    if (loanToEdit) {
      setEditLoan(loanToEdit);
      setShowModal(true);
    } else {
      console.log(`Prêt avec l'ID ${id} non trouvé.`);
    }
  };

  const handleSave = async (updatedLoan) => {
    try {
      const response = await axios.put(
        `http://192.168.11.93:8080/api/pret/${updatedLoan.id}`,
        updatedLoan
      );
      const updatedLoans = loans.map((loan) =>
        loan.id === updatedLoan.id ? response.data : loan
      );
      setLoans(updatedLoans);
      setShowModal(false);
      setEditLoan(null);
    } catch (error) {
      console.error(
        `Erreur lors de la modification du prêt avec l'ID ${updatedLoan.id} :`,
        error
      );
      alert(
        "Erreur lors de la modification du prêt. Veuillez réessayer plus tard."
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.11.93:8080/api/pret/${id}`);
      setLoans(loans.filter((loan) => loan.id !== id));
    } catch (error) {
      console.error(
        `Erreur lors de la suppression du prêt avec l'ID ${id} :`,
        error
      );
      alert(
        "Erreur lors de la suppression du prêt. Veuillez réessayer plus tard."
      );
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLoans = loans.filter((loan) =>
    `${loan.numCompte} ${loan.nomClient} ${loan.nomBanque}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Enregistrement de Prêts Bancaires
      </h1>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white p-2 rounded flex items-center hover:bg-green-600"
        >
          <FaPlus className="mr-2" /> Ajouter
        </button>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Rechercher..."
            className="p-2 border border-gray-300 rounded mr-2"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="bg-blue-500 text-white p-2 rounded flex items-center hover:bg-blue-600">
            <FaSearch />
          </button>
        </div>
      </div>
      {filteredLoans.length === 0 ? (
        <p className="text-center text-gray-700">Aucun prêt trouvé.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4">Numéro de Compte</th>
              <th className="py-2 px-4">Nom du Client</th>
              <th className="py-2 px-4">Nom de la Banque</th>
              <th className="py-2 px-4">Montant du Prêt</th>
              <th className="py-2 px-4">Date du Prêt</th>
              <th className="py-2 px-4">Taux du Prêt</th>
              <th className="py-2 px-4">Montant Total</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan.id} className="text-gray-700">
                <td className="border px-4 py-2">{loan.numCompte}</td>
                <td className="border px-4 py-2">{loan.nomClient}</td>
                <td className="border px-4 py-2">{loan.nomBanque}</td>
                <td className="border px-4 py-2">{loan.montantPret}</td>
                <td className="border px-4 py-2">
                  {format(new Date(loan.datePret), "yyyy/MM/dd")}
                </td>
                <td className="border px-4 py-2">{loan.tauxPret}</td>
                <td className="border px-4 py-2">{loan.montantTotal}</td>
                <td className="border px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(loan.id)}
                    className="bg-yellow-500 text-white p-2 rounded flex items-center hover:bg-yellow-600"
                  >
                    <FaEdit className="mr-1" /> Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(loan.id)}
                    className="bg-red-500 text-white p-2 rounded flex items-center hover:bg-red-600"
                  >
                    <FaTrash className="mr-1" /> Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ModaleAjoutPret
        isOpen={showModal && !editLoan}
        onAdd={handleAddLoan}
        onCancel={() => setShowModal(false)}
      />

      {showModal && editLoan && (
        <ModaleModificationPret
          loan={editLoan}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Home;
