import { Link } from "react-router-dom";

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link
          to="/"
          className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors mb-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Retour à l'accueil
        </Link>

        <h1 className="text-4xl font-extrabold mb-2">
          Politique de confidentialité
        </h1>
        <p className="text-gray-500 text-sm mb-12">
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              1. Introduction
            </h2>
            <p>
              Unify (ci-après « nous », « notre ») s'engage à protéger la vie
              privée des utilisateurs de son site <strong>unify-run.fr</strong>{" "}
              (ci-après « le Site »).
            </p>
            <p className="mt-3">
              La présente Politique de confidentialité a pour objet de vous
              informer sur la manière dont nous collectons, utilisons, stockons
              et protégeons vos données personnelles, conformément au Règlement
              Général sur la Protection des Données (RGPD — Règlement UE
              2016/679) et à la loi Informatique et Libertés du 6 janvier 1978
              modifiée.
            </p>
          </section>

          {/* 2. Responsable du traitement */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Responsable du traitement
            </h2>
            <p>Le responsable du traitement des données personnelles est :</p>
            <ul className="list-none mt-3 space-y-1 text-gray-400">
              <li>
                <strong className="text-gray-300">Nom :</strong> [NOM PRÉNOM]
              </li>
              <li>
                <strong className="text-gray-300">Adresse :</strong> [ADRESSE]
              </li>
              <li>
                <strong className="text-gray-300">Email :</strong> [EMAIL]
              </li>
            </ul>
          </section>

          {/* 3. Données collectées */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              3. Données personnelles collectées
            </h2>
            <p>
              Lors de votre inscription et de votre utilisation du Service, nous
              collectons les données suivantes :
            </p>

            <h3 className="text-lg font-semibold text-white mt-5 mb-2">
              3.1 Données fournies directement par l'utilisateur
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>
                <strong className="text-gray-300">Prénom</strong>
              </li>
              <li>
                <strong className="text-gray-300">Nom</strong>
              </li>
              <li>
                <strong className="text-gray-300">Adresse email</strong>
              </li>
              <li>
                <strong className="text-gray-300">
                  Niveau de course à pied
                </strong>{" "}
                (débutant, intermédiaire, avancé)
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-5 mb-2">
              3.2 Données collectées automatiquement
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>
                <strong className="text-gray-300">Données de navigation</strong>{" "}
                — pages visitées, durée de visite, clics (via Microsoft Clarity)
              </li>
              <li>
                <strong className="text-gray-300">Données d'audience</strong> —
                type de navigateur, système d'exploitation, résolution d'écran,
                source de trafic (via Google Analytics)
              </li>
              <li>
                <strong className="text-gray-300">Adresse IP</strong> —
                collectée de manière anonymisée à des fins statistiques
              </li>
            </ul>
          </section>

          {/* 4. Finalités du traitement */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              4. Finalités du traitement
            </h2>
            <p>
              Vos données personnelles sont utilisées pour les finalités
              suivantes :
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 pr-4 text-white font-semibold">
                      Finalité
                    </th>
                    <th className="text-left py-3 text-white font-semibold">
                      Base légale
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-gray-800">
                    <td className="py-3 pr-4">
                      Création et gestion de votre compte
                    </td>
                    <td className="py-3">Exécution du contrat</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 pr-4">Envoi d'un email de bienvenue</td>
                    <td className="py-3">Exécution du contrat</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 pr-4">
                      Personnalisation de l'expérience (niveau de course)
                    </td>
                    <td className="py-3">Intérêt légitime</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 pr-4">
                      Analyse du trafic et amélioration du Site
                    </td>
                    <td className="py-3">Consentement (cookies)</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 pr-4">
                      Prévention des fraudes et sécurité
                    </td>
                    <td className="py-3">Intérêt légitime</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">
                      Respect des obligations légales
                    </td>
                    <td className="py-3">Obligation légale</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Sous-traitants et destinataires */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              5. Sous-traitants et destinataires des données
            </h2>
            <p>
              Vos données peuvent être transmises aux sous-traitants suivants,
              dans le cadre strict des finalités décrites ci-dessus :
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 pr-4 text-white font-semibold">
                      Sous-traitant
                    </th>
                    <th className="text-left py-3 pr-4 text-white font-semibold">
                      Usage
                    </th>
                    <th className="text-left py-3 text-white font-semibold">
                      Localisation
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-gray-800">
                    <td className="py-3 pr-4">Google Firebase (Firestore)</td>
                    <td className="py-3 pr-4">
                      Stockage des données utilisateurs
                    </td>
                    <td className="py-3">UE / États-Unis*</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 pr-4">EmailJS</td>
                    <td className="py-3 pr-4">
                      Envoi d'emails transactionnels
                    </td>
                    <td className="py-3">États-Unis</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 pr-4">Netlify</td>
                    <td className="py-3 pr-4">Hébergement du site</td>
                    <td className="py-3">États-Unis</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 pr-4">Microsoft Clarity</td>
                    <td className="py-3 pr-4">Analyse comportementale</td>
                    <td className="py-3">États-Unis</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Google Analytics</td>
                    <td className="py-3 pr-4">Mesure d'audience</td>
                    <td className="py-3">États-Unis</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              * Les transferts de données vers les États-Unis sont encadrés par
              le EU-US Data Privacy Framework ou par des clauses contractuelles
              types (CCT) approuvées par la Commission européenne.
            </p>
          </section>

          {/* 6. Durée de conservation */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              6. Durée de conservation
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>
                <strong className="text-gray-300">Données de compte</strong> —
                conservées pendant toute la durée de votre inscription, puis
                supprimées dans un délai de 3 ans après la dernière activité ou
                la demande de suppression
              </li>
              <li>
                <strong className="text-gray-300">
                  Données de navigation (cookies)
                </strong>{" "}
                — conservées pendant une durée maximale de 13 mois conformément
                aux recommandations de la CNIL
              </li>
              <li>
                <strong className="text-gray-300">
                  Données de facturation
                </strong>{" "}
                (si abonnement payant) — conservées pendant 10 ans conformément
                aux obligations comptables
              </li>
            </ul>
          </section>

          {/* 7. Vos droits */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants sur vos
              données personnelles :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-400">
              <li>
                <strong className="text-gray-300">Droit d'accès</strong> —
                obtenir la confirmation que vos données sont traitées et en
                obtenir une copie
              </li>
              <li>
                <strong className="text-gray-300">
                  Droit de rectification
                </strong>{" "}
                — faire corriger des données inexactes ou incomplètes
              </li>
              <li>
                <strong className="text-gray-300">Droit à l'effacement</strong>{" "}
                — demander la suppression de vos données (« droit à l'oubli »)
              </li>
              <li>
                <strong className="text-gray-300">Droit à la limitation</strong>{" "}
                — demander la suspension du traitement de vos données
              </li>
              <li>
                <strong className="text-gray-300">
                  Droit à la portabilité
                </strong>{" "}
                — recevoir vos données dans un format structuré et lisible par
                machine
              </li>
              <li>
                <strong className="text-gray-300">Droit d'opposition</strong> —
                vous opposer au traitement de vos données pour des motifs
                légitimes
              </li>
              <li>
                <strong className="text-gray-300">
                  Droit de retrait du consentement
                </strong>{" "}
                — retirer votre consentement à tout moment pour les traitements
                fondés sur celui-ci
              </li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous à :{" "}
              <strong>[EMAIL]</strong>
            </p>
            <p className="mt-3">
              Nous nous engageons à répondre dans un délai d'un mois. En cas de
              demande complexe, ce délai peut être prolongé de deux mois.
            </p>
            <p className="mt-3">
              Vous avez également le droit d'introduire une réclamation auprès
              de la{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:underline"
              >
                CNIL
              </a>{" "}
              (Commission Nationale de l'Informatique et des Libertés).
            </p>
          </section>

          {/* 8. Cookies */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Cookies</h2>
            <p>Le Site utilise les cookies et traceurs suivants :</p>

            <h3 className="text-lg font-semibold text-white mt-5 mb-2">
              8.1 Cookies strictement nécessaires
            </h3>
            <p className="text-gray-400">
              Ces cookies sont indispensables au fonctionnement du Site et ne
              peuvent pas être désactivés.
            </p>

            <h3 className="text-lg font-semibold text-white mt-5 mb-2">
              8.2 Cookies analytiques
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>
                <strong className="text-gray-300">Microsoft Clarity</strong> —
                enregistre les interactions des utilisateurs (clics,
                défilements, mouvements de souris) pour générer des cartes de
                chaleur et des enregistrements de sessions
              </li>
              <li>
                <strong className="text-gray-300">Google Analytics</strong> —
                mesure le trafic du Site, les pages les plus visitées, les
                sources de trafic et le comportement des visiteurs
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-5 mb-2">
              8.3 Gestion des cookies
            </h3>
            <p>
              Vous pouvez à tout moment gérer vos préférences en matière de
              cookies via les paramètres de votre navigateur :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-400">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:underline"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:underline"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>
          </section>

          {/* 9. Sécurité */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              9. Sécurité des données
            </h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles
              appropriées pour protéger vos données personnelles contre tout
              accès non autorisé, modification, divulgation ou destruction :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-400">
              <li>Communication chiffrée via HTTPS/TLS</li>
              <li>
                Accès restreint aux données par les personnes autorisées
                uniquement
              </li>
              <li>
                Utilisation de services cloud certifiés (Firebase, Netlify)
              </li>
            </ul>
          </section>

          {/* 10. Mineurs */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              10. Protection des mineurs
            </h2>
            <p>
              Le Service est réservé aux personnes âgées de 18 ans et plus. Nous
              ne collectons pas sciemment les données personnelles de mineurs.
              Si nous découvrons que des données d'un mineur ont été collectées,
              nous les supprimerons dans les meilleurs délais.
            </p>
          </section>

          {/* 11. Modifications */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              11. Modifications de la politique
            </h2>
            <p>
              Nous nous réservons le droit de modifier la présente Politique de
              confidentialité à tout moment. Toute modification sera publiée sur
              cette page avec une date de mise à jour. Nous vous encourageons à
              consulter régulièrement cette page.
            </p>
          </section>

          {/* 12. Contact */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">12. Contact</h2>
            <p>
              Pour toute question relative à la présente Politique de
              confidentialité ou pour exercer vos droits, contactez-nous :
            </p>
            <ul className="list-none mt-3 space-y-1 text-gray-400">
              <li>
                <strong className="text-gray-300">Email :</strong> [EMAIL]
              </li>
              <li>
                <strong className="text-gray-300">Site web :</strong>{" "}
                unify-run.fr
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
