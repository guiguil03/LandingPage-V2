import { Link } from "react-router-dom";

export default function MentionsLegales() {
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

        <h1 className="text-4xl font-extrabold mb-2">Mentions légales</h1>
        <p className="text-gray-500 text-sm mb-12">
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          {/* 1. Éditeur du site */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              1. Éditeur du site
            </h2>
            <p>
              Le site <strong>unify-run.fr</strong> (ci-après « le Site ») est
              édité par :
            </p>
            <ul className="list-none mt-3 space-y-1 text-gray-400">
              <li>
                <strong className="text-gray-300">Raison sociale :</strong> [NOM
                DE L'ENTREPRISE] — Micro-entreprise
              </li>
              <li>
                <strong className="text-gray-300">
                  Responsable / Directeur de la publication :
                </strong>{" "}
                [NOM PRÉNOM]
              </li>
              <li>
                <strong className="text-gray-300">Siège social :</strong>{" "}
                [ADRESSE]
              </li>
              <li>
                <strong className="text-gray-300">SIRET :</strong> [NUMÉRO
                SIRET]
              </li>
              <li>
                <strong className="text-gray-300">Email :</strong> [EMAIL]
              </li>
            </ul>
          </section>

          {/* 2. Hébergement */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Hébergement
            </h2>
            <p>Le Site est hébergé par :</p>
            <ul className="list-none mt-3 space-y-1 text-gray-400">
              <li>
                <strong className="text-gray-300">Netlify, Inc.</strong>
              </li>
              <li>512 2nd Street, Suite 200</li>
              <li>San Francisco, CA 94107, États-Unis</li>
              <li>
                Site web :{" "}
                <a
                  href="https://www.netlify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:underline"
                >
                  www.netlify.com
                </a>
              </li>
            </ul>
          </section>

          {/* 3. Propriété intellectuelle */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              3. Propriété intellectuelle
            </h2>
            <p>
              L'ensemble des éléments figurant sur le Site (textes, images,
              logos, icônes, graphismes, vidéos, mises en page, bases de
              données, code source, etc.) sont la propriété exclusive de Unify
              ou de ses partenaires et sont protégés par les lois françaises et
              internationales relatives à la propriété intellectuelle.
            </p>
            <p className="mt-3">
              Toute reproduction, représentation, modification, publication,
              adaptation, totale ou partielle, de ces éléments, quel que soit le
              moyen ou le procédé utilisé, est interdite sans l'autorisation
              écrite préalable de Unify.
            </p>
          </section>

          {/* 4. Données personnelles */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              4. Données personnelles
            </h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données
              (RGPD) et à la loi Informatique et Libertés du 6 janvier 1978
              modifiée, vous disposez d'un droit d'accès, de rectification, de
              suppression, de limitation et de portabilité de vos données
              personnelles.
            </p>
            <p className="mt-3">
              Pour plus d'informations sur le traitement de vos données,
              veuillez consulter notre{" "}
              <Link
                to="/politique-de-confidentialite"
                className="text-primary-500 hover:underline"
              >
                Politique de confidentialité
              </Link>
              .
            </p>
            <p className="mt-3">
              Pour exercer vos droits, vous pouvez nous contacter à l'adresse
              suivante : <strong>[EMAIL]</strong>.
            </p>
          </section>

          {/* 5. Cookies */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Cookies</h2>
            <p>
              Le Site utilise des cookies et des technologies de suivi pour
              améliorer l'expérience utilisateur et analyser le trafic. Les
              outils suivants sont utilisés :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-400">
              <li>
                <strong className="text-gray-300">Microsoft Clarity</strong> —
                Analyse comportementale et cartes de chaleur
              </li>
              <li>
                <strong className="text-gray-300">Google Analytics</strong> —
                Mesure d'audience et statistiques de fréquentation
              </li>
            </ul>
            <p className="mt-3">
              Vous pouvez configurer votre navigateur pour refuser les cookies
              ou être informé(e) de leur dépôt. Le refus de cookies peut limiter
              l'accès à certaines fonctionnalités du Site.
            </p>
          </section>

          {/* 6. Limitation de responsabilité */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              6. Limitation de responsabilité
            </h2>
            <p>
              Unify s'efforce de fournir des informations aussi précises que
              possible sur le Site. Toutefois, Unify ne peut garantir
              l'exactitude, la complétude et l'actualité des informations
              diffusées.
            </p>
            <p className="mt-3">
              Unify décline toute responsabilité en cas de :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-gray-400">
              <li>
                Imprécision, inexactitude ou omission portant sur des
                informations disponibles sur le Site
              </li>
              <li>
                Dommages résultant d'une intrusion frauduleuse d'un tiers ayant
                entraîné une modification des informations
              </li>
              <li>
                Dommages directs ou indirects causés à l'utilisateur lors de
                l'accès au Site
              </li>
            </ul>
          </section>

          {/* 7. Liens hypertextes */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              7. Liens hypertextes
            </h2>
            <p>
              Le Site peut contenir des liens vers d'autres sites internet.
              Unify n'exerce aucun contrôle sur ces sites et décline toute
              responsabilité quant à leur contenu ou à leurs pratiques en
              matière de protection des données personnelles.
            </p>
          </section>

          {/* 8. Droit applicable */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              8. Droit applicable
            </h2>
            <p>
              Les présentes mentions légales sont régies par le droit français.
              En cas de litige, et après tentative de résolution amiable, les
              tribunaux français seront seuls compétents.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
