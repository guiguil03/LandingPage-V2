import emailjs from '@emailjs/browser';


const EMAILJS_SERVICE_ID = "service_l9fyqof";
const EMAILJS_TEMPLATE_ID = "template_tfi6oam";
const EMAILJS_PUBLIC_KEY = "gvSerVoB9ElFTT6TH";

// Initialiser EmailJS avec la clé publique
emailjs.init(EMAILJS_PUBLIC_KEY);

/**
 * Envoie un email de bienvenue en utilisant le template EmailJS configuré
 * Cette fonction utilise exactement le même code que celui montré dans la capture d'écran du test EmailJS
 * 
 * @param firstName Prénom de l'utilisateur
 * @param email Email de l'utilisateur
 * @param runningLevel Niveau de course de l'utilisateur
 * @returns Promise<boolean> true si l'email a été envoyé avec succès, false sinon
 */
export const sendWelcomeEmail = async (
  firstName: string,
  email: string,
  runningLevel: string
): Promise<boolean> => {
  try {
    // Vérifier que l'email est valide
    if (!email || email.trim() === '') {
      console.error('Erreur: adresse email vide');
      return false;
    }

    console.log('Début de tentative d\'envoi d\'email à:', email);
    
    // Configuration de l'email à envoyer
    // L'email sera envoyé à partir de unify@gmail.com (configuré dans le service EmailJS)
    // et sera reçu par l'utilisateur qui s'inscrit
    
    // Utiliser la méthode avec tous les paramètres explicites, y compris la clé publique
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_name: firstName,                 // Nom du destinataire (l'utilisateur inscrit)
        running_level: runningLevel,        // Niveau de course de l'utilisateur
        message: "bienvenue",               // Message de bienvenue
        email: email.trim(),            // Email du destinataire (l'utilisateur inscrit)
        from_name: "Unify Running",         // Nom de l'expéditeur
        to_email: "unify@gmail.com",      // Email de l'expéditeur
        reply_to: "unify@gmail.com",        // Adresse de réponse
        name: firstName                    // Nom pour personnalisation
      },
      EMAILJS_PUBLIC_KEY // Clé publique EmailJS
    );
    
    console.log('Email envoyé avec succès!', response.status, response.text);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
};
