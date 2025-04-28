import { useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { createUser, checkEmailExists } from "../hooks/Auth";
import { sendWelcomeEmail } from "../services/emailService";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const totalSteps = 2;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Vérification de l'email lors du passage à l'étape suivante
  const checkEmail = async () => {
    if (formData.email.trim() === "") {
      setErrorMessage("Veuillez entrer une adresse email.");
      return false;
    }

    try {
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setErrorMessage("Cet email est déjà utilisé. Veuillez en choisir un autre.");
        return false;
      }
      setErrorMessage("");
      return true;
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email:", error);
      setErrorMessage("Erreur lors de la vérification de l'email. Veuillez réessayer.");
      return false;
    }
  };

  // Envoyer un email de bienvenue après l'inscription
  const sendWelcomeEmailToUser = async (firstName: string, email: string, runningLevel: string) => {
    try {
      console.log('Tentative d\'envoi d\'email à:', email, 'pour:', firstName, 'niveau:', runningLevel);
      const emailSent = await sendWelcomeEmail(firstName, email, runningLevel);
      if (emailSent) {
        console.log('Email de bienvenue envoyé avec succès à:', email);
      } else {
        console.warn('L\'email de bienvenue n\'a pas pu être envoyé à:', email);
      }
      return emailSent;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de bienvenue:', error);
      // Continuer malgré l'erreur d'envoi d'email
      return false;
    }
  };

  // Fermer l'alerte de succès et réinitialiser le formulaire
  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
    setSuccessMessage("");
    onClose();
    setFormData(initialFormData);
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < totalSteps) {
      // Vérifier l'email avant de passer à l'étape suivante
      if (step === 1) {
        const isEmailValid = await checkEmail();
        if (!isEmailValid) return;
      }
      setStep(step + 1);
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      // Créer l'utilisateur dans la base de données
      await createUser(formData);
      
      // Envoyer un email de bienvenue
      const emailSent = await sendWelcomeEmailToUser(
        formData.firstName,
        formData.email,
        formData.runningLevel
      );
      
      // Afficher un message de confirmation personnalisé
      if (emailSent) {
        setSuccessMessage(`Merci pour votre inscription ${formData.firstName} ! Nous avons hâte de vous voir courir avec Unify. Un email de bienvenue a été envoyé à ${formData.email}.`);
      } else {
        setSuccessMessage(`Merci pour votre inscription ${formData.firstName} ! Nous avons hâte de vous voir courir avec Unify.`);
        console.warn('Affichage du message de succès sans confirmation d\'email');
      }
      setShowSuccessAlert(true);
      
    } catch (error: unknown) {
      console.error("Erreur lors de l'inscription:", error);
      if (error instanceof Error) {
        setErrorMessage(error.message || "Erreur lors de l'inscription. Veuillez réessayer.");
      } else {
        setErrorMessage("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

 
    

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-full max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4 z-50"
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
      {showSuccessAlert ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-6 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Inscription réussie !</h2>
            <button 
              onClick={handleCloseSuccessAlert}
              className="text-white hover:text-gray-200 transition-colors focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <p className="mb-4">{successMessage}</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p>Vous pouvez dès maintenant vous connecter à l'application</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <p>Consultez votre boîte mail pour plus d'informations</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleCloseSuccessAlert}
            className="w-full bg-white text-red-600 py-3 px-6 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium shadow-md"
          >
            Fermer
          </button>
        </motion.div>
      ) : (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={modalVariants}
        className="relative"
      >
        <div className="flex justify-between items-center bg-gradient-to-r from-red-600 to-red-500 text-white p-5">
          <h2 className="text-2xl font-bold">Rejoignez UNIFY</h2>
          <button 
            onClick={onClose} 
            className="text-2xl hover:text-gray-200 transition-colors focus:outline-none"
            aria-label="Fermer"
          >
            &times;
          </button>
        </div>

        <div className="px-6 pt-4">
          <div className="flex justify-between mb-6">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${index + 1 <= step ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  {index + 1}
                </div>
                <div className="text-xs mt-1 text-gray-500">
                  {index === 0 ? 'Identité' : 'Profil'}
                </div>
              </div>
            ))}
            <div className="absolute top-[108px] left-0 right-0 h-[2px] bg-gray-200 -z-10 mx-10">
              <div 
                className="h-full bg-red-500 transition-all duration-300" 
                style={{ width: `${(step - 1) / (totalSteps - 1) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-2">
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errorMessage}
            </div>
          )}
          
          {step === 1 && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={formVariants}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Votre prénom"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 pl-10"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 pl-10"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre.email@exemple.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 pl-10"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={formVariants}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label htmlFor="runningLevel" className="block text-sm font-medium text-gray-700">Niveau en course à pied</label>
                <div className="relative">
                  <select
                    id="runningLevel"
                    name="runningLevel"
                    value={formData.runningLevel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 pl-10 appearance-none"
                  >
                    <option value="débutant">Débutant</option>
                    <option value="intermédiaire">Intermédiaire</option>
                    <option value="avancé">Avancé</option>
                  </select>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="mt-8 text-sm text-gray-600">
                <p>En vous inscrivant, vous acceptez nos <a href="#" className="text-red-500 hover:underline">Conditions d'utilisation</a> et notre <a href="#" className="text-red-500 hover:underline">Politique de confidentialité</a>.</p>
              </div>
            </motion.div>
          )}

          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <button 
                type="button" 
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Retour
              </button>
            )}
            <button 
              type="submit" 
              className={`${step > 1 ? 'ml-auto' : 'w-full'} bg-gradient-to-r from-red-600 to-red-500 text-white py-3 px-6 rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {step < totalSteps ? 'Continuer' : 'S\'inscrire'}
            </button>
          </div>
        </form>
      </motion.div>
      )}
    </Modal>
  );
};

export default SignupModal;
