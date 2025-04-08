const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

admin.initializeApp();

// Configuration du transporteur d'email
// Pour la production, utilisez un service SMTP réel
// Pour le développement, vous pouvez utiliser un service comme Mailtrap ou Ethereal
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Remplacez par votre serveur SMTP
  port: 587,
  secure: false, // true pour 465, false pour les autres ports
  auth: {
    user: 'votre-email@gmail.com', // Remplacez par votre email
    pass: 'votre-mot-de-passe-app', // Remplacez par votre mot de passe d'application
  },
});

// Fonction pour lire le template HTML
const readHTMLTemplate = () => {
  try {
    const templatePath = path.join(__dirname, '../src/templates/emailTemplate.html');
    return fs.readFileSync(templatePath, 'utf8');
  } catch (error) {
    console.error('Erreur lors de la lecture du template HTML:', error);
    return null;
  }
};

// Fonction pour remplacer les variables dans le template
const replaceTemplateVariables = (template, variables) => {
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  return result;
};

// Fonction Cloud pour envoyer un email
exports.sendWelcomeEmail = functions.firestore
  .document('usersDB/{userId}')
  .onCreate(async (snap, context) => {
    try {
      const userData = snap.data();
      const userId = context.params.userId;
      
      // Vérifier si les données nécessaires sont présentes
      if (!userData.email || !userData.firstName) {
        console.error('Données utilisateur incomplètes:', userData);
        return null;
      }

      // Lire le template HTML
      const htmlTemplate = readHTMLTemplate();
      if (!htmlTemplate) {
        console.error('Template HTML non trouvé');
        return null;
      }

      // Remplacer les variables dans le template
      const htmlContent = replaceTemplateVariables(htmlTemplate, {
        to_name: userData.firstName,
        to_email: userData.email,
        running_level: userData.runningLevel || 'débutant',
        message: 'Vous pouvez dès maintenant profiter de toutes les fonctionnalités de notre application pour trouver des partenaires de course et partager votre passion !'
      });

      // Configurer l'email
      const mailOptions = {
        from: '"Unify App" <no-reply@unify-app.com>',
        to: userData.email,
        subject: 'Bienvenue chez Unify !',
        html: htmlContent,
      };

      // Envoyer l'email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email envoyé:', info.messageId);

      // Mettre à jour le document utilisateur pour indiquer que l'email a été envoyé
      await admin.firestore().collection('usersDB').doc(userId).update({
        isEmailSent: true,
        emailSentAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return info.messageId;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      return null;
    }
  });

// Fonction HTTP pour envoyer un email manuellement (utile pour les tests)
exports.sendEmailManually = functions.https.onCall(async (data, context) => {
  try {
    // Vérifier si l'utilisateur est authentifié (optionnel)
    // if (!context.auth) {
    //   throw new functions.https.HttpsError('unauthenticated', 'L\'utilisateur doit être authentifié');
    // }

    const { email, firstName, lastName, runningLevel, userId } = data;

    // Vérifier si les données nécessaires sont présentes
    if (!email || !firstName) {
      throw new functions.https.HttpsError('invalid-argument', 'Données incomplètes');
    }

    // Lire le template HTML
    const htmlTemplate = readHTMLTemplate();
    if (!htmlTemplate) {
      throw new functions.https.HttpsError('internal', 'Template HTML non trouvé');
    }

    // Remplacer les variables dans le template
    const htmlContent = replaceTemplateVariables(htmlTemplate, {
      to_name: firstName,
      to_email: email,
      running_level: runningLevel || 'débutant',
      message: 'Vous pouvez dès maintenant profiter de toutes les fonctionnalités de notre application pour trouver des partenaires de course et partager votre passion !'
    });

    // Configurer l'email
    const mailOptions = {
      from: '"Unify App" <no-reply@unify-app.com>',
      to: email,
      subject: 'Bienvenue chez Unify !',
      html: htmlContent,
    };

    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé manuellement:', info.messageId);

    // Mettre à jour le document utilisateur si un userId est fourni
    if (userId) {
      await admin.firestore().collection('usersDB').doc(userId).update({
        isEmailSent: true,
        emailSentAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur lors de l\'envoi manuel de l\'email:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});
