import { collection, doc, setDoc, getDocs, query, where, updateDoc } from "firebase/firestore";
import { app_db } from "../../FirebaseConfig";
import emailjs from '@emailjs/browser';
  
  type runningLevelType = "débutant" | "intermédiaire" | "avancé";
  
  export async function createUser(datas: {
    email: string;
    runningLevel: runningLevelType;
    firstName: string;
    lastName: string;
  }) {
    const { email, firstName, lastName, runningLevel } = datas;
    try {
      // Générer un ID unique pour l'utilisateur
      const userId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      
      // Sauvegarder les infos dans Firestore DB
      const usersCollections = collection(app_db, "usersDB");
      const usersDoc = doc(usersCollections, userId);
      await setDoc(usersDoc, {
        email,
        firstName,
        lastName,
        runningLevel,
        createdAt: new Date(),
        isEmailSent: false, // Pour suivre si l'email a été envoyé
      });

      // Envoyer un email de confirmation
      const emailSent = await sendConfirmationEmail(firstName, email, runningLevel);
      
      // Mettre à jour le statut d'envoi d'email
      if (emailSent) {
        await setDoc(usersDoc, { isEmailSent: true }, { merge: true });
        console.log('Email envoyé avec succès et statut mis à jour');
      }
      
      return true;
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      return false;
    }
  }

/**
 * Fonction pour envoyer un email de confirmation
 * Utilise EmailJS pour envoyer un email directement depuis le navigateur
 */
export async function sendConfirmationEmail(firstName: string, email: string, runningLevel: string = "débutant") {
  try {
    // Vérifier que l'email est bien défini
    if (!email || email.trim() === '') {
      console.error('Erreur: adresse email vide');
      return false;
    }
    
    // Préparer les données pour le template selon la documentation EmailJS
    // Les noms des paramètres doivent correspondre exactement aux variables dans le template
    const templateParams = {
      // Paramètres standard pour EmailJS
      to_name: firstName,
      to_email: email.trim(),
      from_name: "Unify Running",
      
      // Paramètres personnalisés pour notre template
      running_level: runningLevel,
      message: "Bienvenue sur notre application de running!"
    };
    
    console.log('Paramètres pour EmailJS:', JSON.stringify(templateParams, null, 2));
    
    console.log('Envoi d\'email en cours avec les données:', templateParams);
    
    // Utiliser la méthode recommandée par EmailJS
    emailjs.init("gvSerVoB9ElFTT6TH"); // Initialiser avec la clé publique
    
    console.log('Envoi d\'email avec EmailJS...');
    console.log('- Service ID:', "service_iu8bv5p");
    console.log('- Template ID:', "template_tfi6oam");
    
    // Envoyer l'email en utilisant la méthode officielle d'EmailJS
    const response = await emailjs.send(
      "service_iu8bv5p",
      "template_tfi6oam",
      templateParams
    );
    
    // Mettre à jour le statut d'envoi d'email dans Firestore
    try {
      const usersCollections = collection(app_db, "usersDB");
      // Trouver l'utilisateur par email
      const querySnapshot = await getDocs(query(usersCollections, where("email", "==", email)));
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        await updateDoc(userDoc.ref, { isEmailSent: true });
        console.log('Statut d\'envoi d\'email mis à jour dans Firestore');
      }
    } catch (updateError) {
      console.error('Erreur lors de la mise à jour du statut d\'envoi:', updateError);
      // On continue même si la mise à jour échoue
    }
    
    console.log('Email envoyé avec succès!', response.status, response.text);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    
    // En cas d'erreur, afficher un message à l'utilisateur
    console.error('Détails de l\'erreur:', JSON.stringify(error));
    return false;
  }
}
  