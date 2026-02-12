import { Link } from "react-router-dom";

export default function CGU() {
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
          Conditions générales d'utilisation
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
          {/* 1. Objet */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Objet</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation (ci-après « CGU
              ») ont pour objet de définir les conditions d'accès et
              d'utilisation du site <strong>unify-run.fr</strong> et des
              services proposés par Unify (ci-après « le Service »).
            </p>
            <p className="mt-3">
              Unify est une plateforme communautaire dédiée à la course à pied,
              permettant aux utilisateurs de rejoindre une communauté de
              coureurs, de participer à des événements et de bénéficier d'un
              accompagnement personnalisé.
            </p>
            <p className="mt-3">
              L'inscription au Service implique l'acceptation pleine et entière
              des présentes CGU. Si vous n'acceptez pas ces conditions, vous ne
              devez pas utiliser le Service.
            </p>
          </section>

          {/* 2. Accès au Service */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Accès au Service
            </h2>
            <p>
              Le Service est accessible gratuitement à tout utilisateur
              disposant d'un accès à Internet. Certaines fonctionnalités
              avancées peuvent être soumises à un abonnement payant.
            </p>
            <p className="mt-3">
              Unify se réserve le droit de modifier, suspendre ou interrompre
              tout ou partie du Service à tout moment, sans préavis et sans
              indemnité.
            </p>
          </section>

          {/* 3. Conditions d'inscription */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              3. Conditions d'inscription
            </h2>
            <p>Pour s'inscrire sur Unify, l'utilisateur doit :</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-400">
              <li>
                Être{" "}
                <strong className="text-gray-300">
                  âgé(e) d'au moins 18 ans
                </strong>
              </li>
              <li>
                Fournir des informations exactes et complètes (prénom, nom,
                adresse email, niveau de course)
              </li>
              <li>
                Ne pas créer de compte en utilisant une fausse identité ou
                l'identité d'une autre personne
              </li>
              <li>
                Accepter les présentes CGU ainsi que la{" "}
                <Link
                  to="/politique-de-confidentialite"
                  className="text-primary-500 hover:underline"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
            <p className="mt-3">
              Unify se réserve le droit de refuser ou de résilier tout compte
              qui ne respecterait pas ces conditions, sans préavis ni indemnité.
            </p>
          </section>

          {/* 4. Abonnements et tarifs */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              4. Abonnements et tarifs
            </h2>
            <p>
              Unify propose une offre gratuite ainsi que des abonnements payants
              donnant accès à des fonctionnalités supplémentaires. Les tarifs en
              vigueur sont indiqués sur le Site et peuvent être modifiés à tout
              moment.
            </p>
            <p className="mt-3">
              En cas de modification tarifaire, les utilisateurs disposant d'un
              abonnement en cours seront informés par email au moins 30 jours
              avant l'entrée en vigueur des nouveaux tarifs.
            </p>
            <p className="mt-3">
              L'abonnement payant est souscrit pour la durée indiquée lors de la
              souscription. Il est renouvelé automatiquement sauf résiliation
              par l'utilisateur avant la date de renouvellement.
            </p>
          </section>

          {/* 5. Obligations de l'utilisateur */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              5. Obligations de l'utilisateur
            </h2>
            <p>L'utilisateur s'engage à :</p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-400">
              <li>
                Utiliser le Service de manière conforme à sa destination et dans
                le respect des lois en vigueur
              </li>
              <li>
                Ne pas utiliser le Service à des fins illicites, frauduleuses ou
                portant atteinte aux droits de tiers
              </li>
              <li>
                Ne pas porter atteinte au bon fonctionnement du Site (tentatives
                de piratage, surcharge des serveurs, etc.)
              </li>
              <li>
                Respecter les autres membres de la communauté Unify, faire
                preuve de courtoisie et de bienveillance
              </li>
              <li>
                Ne pas harceler, menacer, diffamer ou discriminer d'autres
                utilisateurs
              </li>
              <li>
                Ne pas utiliser le Service à des fins commerciales ou
                publicitaires sans autorisation préalable
              </li>
              <li>
                Maintenir la confidentialité de ses identifiants de connexion
              </li>
            </ul>
          </section>

          {/* 6. Rencontres et événements */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              6. Rencontres et événements
            </h2>
            <p>
              Unify facilite la mise en relation entre coureurs et
              l'organisation d'événements sportifs. Toutefois :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-400">
              <li>
                Unify{" "}
                <strong className="text-gray-300">n'est pas responsable</strong>{" "}
                du comportement des utilisateurs lors de rencontres ou
                événements organisés via la plateforme
              </li>
              <li>
                Chaque utilisateur participe aux rencontres et événements{" "}
                <strong className="text-gray-300">
                  sous sa propre responsabilité
                </strong>
              </li>
              <li>
                Unify recommande de toujours pratiquer la course à pied dans des
                conditions de sécurité adaptées à son niveau et à son état de
                santé
              </li>
              <li>
                En cas de comportement inapproprié d'un utilisateur, Unify
                invite à le signaler immédiatement via l'adresse de contact
              </li>
            </ul>
          </section>

          {/* 7. Propriété intellectuelle */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              7. Propriété intellectuelle
            </h2>
            <p>
              L'ensemble des contenus du Site (textes, images, logos, éléments
              graphiques, logiciels, bases de données) sont la propriété
              exclusive de Unify et sont protégés par le droit de la propriété
              intellectuelle.
            </p>
            <p className="mt-3">
              Toute reproduction, représentation ou exploitation non autorisée
              de ces éléments constitue une contrefaçon sanctionnée par la loi.
            </p>
          </section>

          {/* 8. Limitation de responsabilité */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              8. Limitation de responsabilité
            </h2>
            <p>
              Unify met tout en œuvre pour assurer la disponibilité et le bon
              fonctionnement du Service. Toutefois, Unify ne saurait être tenu
              responsable :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-400">
              <li>
                Des interruptions temporaires du Service pour des raisons de
                maintenance ou de mise à jour
              </li>
              <li>
                Des dysfonctionnements liés à des causes extérieures (coupure
                réseau, panne serveur de l'hébergeur, etc.)
              </li>
              <li>
                Des dommages directs ou indirects résultant de l'utilisation du
                Service
              </li>
              <li>Du contenu publié par les utilisateurs</li>
              <li>
                Des conséquences liées aux rencontres ou interactions entre
                utilisateurs
              </li>
            </ul>
          </section>

          {/* 9. Suspension et résiliation */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              9. Suspension et résiliation
            </h2>
            <p>
              Unify se réserve le droit de suspendre ou de supprimer le compte
              de tout utilisateur en cas de :
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-400">
              <li>Non-respect des présentes CGU</li>
              <li>
                Comportement inapproprié, abusif ou dangereux envers d'autres
                utilisateurs
              </li>
              <li>Utilisation frauduleuse du Service</li>
              <li>Fourniture d'informations fausses lors de l'inscription</li>
            </ul>
            <p className="mt-3">
              L'utilisateur peut à tout moment demander la suppression de son
              compte en envoyant un email à <strong>[EMAIL]</strong>.
            </p>
          </section>

          {/* 10. Droit de rétractation */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              10. Droit de rétractation
            </h2>
            <p>
              Conformément aux articles L.221-18 et suivants du Code de la
              consommation, l'utilisateur dispose d'un délai de 14 jours à
              compter de la souscription d'un abonnement payant pour exercer son
              droit de rétractation, sans avoir à justifier de motifs ni à payer
              de pénalités.
            </p>
            <p className="mt-3">
              Pour exercer ce droit, l'utilisateur doit adresser une demande par
              email à <strong>[EMAIL]</strong> avant l'expiration du délai.
            </p>
          </section>

          {/* 11. Modification des CGU */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              11. Modification des CGU
            </h2>
            <p>
              Unify se réserve le droit de modifier les présentes CGU à tout
              moment. Les modifications entreront en vigueur dès leur
              publication sur le Site. L'utilisation continue du Service après
              modification vaut acceptation des nouvelles CGU.
            </p>
            <p className="mt-3">
              En cas de modification substantielle, les utilisateurs seront
              informés par email ou par notification sur le Site.
            </p>
          </section>

          {/* 12. Droit applicable et juridiction */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              12. Droit applicable et juridiction compétente
            </h2>
            <p>
              Les présentes CGU sont soumises au droit français. En cas de
              litige relatif à l'interprétation ou à l'exécution des présentes,
              les parties s'efforceront de trouver une solution amiable.
            </p>
            <p className="mt-3">
              À défaut, le litige sera porté devant les tribunaux compétents du
              ressort du siège social de Unify.
            </p>
            <p className="mt-3">
              Conformément à l'article L.612-1 du Code de la consommation,
              l'utilisateur peut recourir gratuitement à un médiateur de la
              consommation en vue de la résolution amiable de tout litige.
            </p>
          </section>

          {/* 13. Contact */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3">13. Contact</h2>
            <p>
              Pour toute question relative aux présentes CGU, vous pouvez nous
              contacter :
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
