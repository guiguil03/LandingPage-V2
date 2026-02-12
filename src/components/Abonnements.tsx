import React from "react";
import { motion } from "framer-motion";
import Logo from "../assets/logo.png";

interface PlanProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
}

const PricingPlan: React.FC<PlanProps> = ({
  title,
  price,
  features,
  isPopular = false,
  buttonText = "S'abonner",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow-lg ${
        isPopular
          ? "border-primary-500 bg-gradient-to-b from-primary-100 to-white relative"
          : "border-gray-200 bg-white"
      }`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-bl-lg rounded-tr-lg">
          Populaire
        </div>
      )}

      <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>

      <div className="my-8">
        <span className="text-5xl font-extrabold text-gray-900">{price}</span>
        <span className="text-gray-500 text-xl">/mois</span>
      </div>

      <ul className="mb-8 space-y-4 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <svg
              className="flex-shrink-0 w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-base font-normal text-gray-500">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={`py-3 px-6 font-medium rounded-lg text-white ${
          isPopular
            ? "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
            : "bg-primary-700 hover:bg-primary-800"
        } transition-colors duration-300 transform hover:scale-105`}
      >
        {buttonText}
      </button>
    </motion.div>
  );
};

const Abonnements: React.FC = () => {
  return (
    <section id="abonnements" className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <img
              src={Logo}
              alt="Logo Unify"
              className="h-12 w-12 md:h-16 md:w-16 object-contain"
            />
            <motion.h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900">
              Nos formules d'abonnement
            </motion.h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-primary-500 font-semibold"
          >
            Choisissez l'offre qui correspond le mieux à vos besoins et
            commencez à courir avec Unify dès aujourd'hui.
          </motion.p>
        </div>

        <div className="grid max-w-screen-lg gap-8 mx-auto lg:grid-cols-2 lg:px-16">
          <PricingPlan
            title="Freemium"
            price="0€"
            features={[
              "Connexion entre coureurs de base",
              "Accès à un nombre limité de défis communautaires",
              "Statistiques essentielles (distance, durée, rythme)",
              "Accès au fil social (publication, like, commentaires)",
            ]}
            buttonText="Commencer gratuitement"
          />

          <PricingPlan
            title="Premium"
            price="4,99€"
            features={[
              "Connexion entre coureurs avancé (filtres : rythme précis, objectifs, profils compatibles...)",
              "Création de groupes privés ou thématiques",
              "Défis exclusifs avec récompenses",
              "Statistiques poussées et historiques",
              "Accès à un coach virtuel ou à des plans d'entraînement personnalisés",
              'Fonction "ghost runner" (courses virtuelles avec soi-même ou d\'autres utilisateurs)',
            ]}
            isPopular={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Abonnements;
