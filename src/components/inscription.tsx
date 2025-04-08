import { useState } from "react";
import Modal from "react-modal";
import { createUser } from "../hooks/Auth";

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  runningLevel: "débutant" | "intermédiaire" | "avancé";
}

export interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Configuration du modal pour l'accessibilité
// Utilisation d'une IIFE pour éviter les erreurs de lint
(() => {
  try {
    Modal.setAppElement("#root");
  } catch {
    // Silencieusement échouer si #root n'existe pas
  }
})();

const initialFormData: UserFormData = {
  firstName: "",
  lastName: "",
  email: "",
  runningLevel: "débutant",
};

const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const [formData, setFormData] = useState<UserFormData>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(formData);
      
      // Afficher un message de confirmation plus convivial
      alert(`Merci pour votre inscription ${formData.firstName} ! Un email de confirmation a été envoyé à ${formData.email}.`);
      
      // Fermer le modal et réinitialiser le formulaire
      onClose();
      setFormData(initialFormData);
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      style={{
        content: {
          position: 'relative',
          top: 'auto',
          left: 'auto',
          right: 'auto',
          bottom: 'auto',
          border: 'none',
          padding: '0',
          maxWidth: '500px',
          width: '100%',
        }
      }}
    >
      <div className="flex justify-between items-center bg-red-500 text-white p-4">
        <h2 className="text-xl font-bold">Inscription</h2>
        <button onClick={onClose} className="text-2xl hover:text-gray-200 transition-colors">
          &times;
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>



        <div className="space-y-2">
          <label htmlFor="runningLevel" className="block text-sm font-medium text-gray-700">Niveau en course à pied</label>
          <select
            id="runningLevel"
            name="runningLevel"
            value={formData.runningLevel}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="débutant">Débutant</option>
            <option value="intermédiaire">Intermédiaire</option>
            <option value="avancé">Avancé</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300 font-medium mt-4 shadow-md hover:shadow-lg transform hover:scale-105">
          S'inscrire
        </button>
      </form>
    </Modal>
  );
};

export default SignupModal;
