import emailjs from '@emailjs/browser';

// Configuration EmailJS avec les identifiants existants
// Ces valeurs sont exactement celles de la capture d'écran
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
    
    // Utiliser exactement le même format que celui montré dans la capture d'écran du test EmailJS
    // emailjs.send("service_l9fyqof","template_tfi6oam",{
    //   to_name: "guigui",
    //   running_level: "debutant",
    //   message: "bienvenuz",
    //   to_email: "guillaumel1103@gmail.com",
    //   from_name: "guilluame",
    //   name: "guigui",
    //   email: "guillaumel2811@gmail.com"
    // });
    
    // Utiliser la méthode avec tous les paramètres explicites, y compris la clé publique
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_name: firstName,
        running_level: runningLevel,
        message: "bienvenuz",
        to_email: email.trim(),
        from_name: "Unify",
        name: firstName,
        email: email.trim()
      },
      EMAILJS_PUBLIC_KEY // Ajouter explicitement la clé publique ici
    );
    
    console.log('Email envoyé avec succès!', response.status, response.text);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
};
