import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
  } from "firebase/auth";
  
  import { app_auth, app_db } from "../../FirebaseConfig";
  import { collection, doc, setDoc } from "firebase/firestore";
  
  type runningLevelType = "débutant" | "intermédiaire" | "avancé";
  
  export async function createUser(datas: {
    email: string;
    password: string;
    runningLevel: runningLevelType;
    firstName: string;
    lastName: string;
  }) {
    const { email, password, firstName, lastName, runningLevel } = datas;
    try {
      //* Création du compte avec Auth de firebase
      const response = await createUserWithEmailAndPassword(
        app_auth,
        email,
        password
      );
  
      //* Envoie un mail de confirmation de mail
      await sendEmailVerification(response.user);
  
      //* Save les infos dans firestore DB
      const usersCollections = collection(app_db, "usersDB");
      const usersDoc = doc(usersCollections, response.user.uid);
      await setDoc(usersDoc, {
        firstName,
        lastName,
        runningLevel,
      });
    } catch {
      return false;
    }
  }
  