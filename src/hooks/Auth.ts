import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";
import { app_db } from "../../FirebaseConfig";
  
  type runningLevelType = "débutant" | "intermédiaire" | "avancé";
  
  /**
   * @param email L'email à vérifier
   * @returns true si l'email est déjà utilisé, false sinon
   */
  export async function checkEmailExists(email: string): Promise<boolean> {
    try {
      const usersCollections = collection(app_db, "usersDB");
      const querySnapshot = await getDocs(query(usersCollections, where("email", "==", email)));
      
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email:", error);
      // En cas d'erreur, on suppose que l'email n'existe pas pour éviter de bloquer l'inscription
      return false;
    }
  }

  export async function createUser(datas: {
    email: string;
    runningLevel: runningLevelType;
    firstName: string;
    lastName: string;
  }) {
    const { email, firstName, lastName, runningLevel } = datas;
    try {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        throw new Error("Cet email est déjà utilisé. Veuillez en choisir un autre.");
      }
      
      const userId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      
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

      return true;
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      throw error; // Propager l'erreur pour pouvoir l'afficher dans le formulaire
    }
  }


  