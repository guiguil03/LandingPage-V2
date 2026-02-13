import React from "react";
import { motion } from "framer-motion";

const freemiumFeatures = [
  "Matching instantané",
  "Modes de connexion (F/H/Mixte)",
  "Rencontres limitées (2 par mois)",
  "Partage de position",
  "Vérification d'identité (basique)",
  "Assistance",
];

const premiumFeatures = [
  "Matching instantané",
  "Modes de connexion (F/H/Mixte)",
  "Rencontres illimitées",
  "Partage de position",
  "Vérification d'identité (avancé : badge)",
  "Accès aux groupes privés",
  "Statistiques avancées",
  "Coaching",
  "Accès aux évènements",
  "Assistance",
];

const Abonnements: React.FC = () => {
  return (
    <section
      id="abonnements"
      className="relative h-screen flex flex-col justify-center py-10 sm:py-16 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 w-full">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Rejoins le mouvement
          </h2>
          <p className="mt-4 text-white/30 text-base sm:text-lg">
            Gratuit pour commencer, Premium pour aller plus loin.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-start">
          {/* FREEMIUM */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: false, margin: "-100px" }}
            className="bg-[#353331] border border-[#2E2E2E] rounded-[32px] p-6 sm:p-8 hover:rotate-0 transition-transform duration-500"
          >
            <div className="flex items-baseline justify-between mb-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Freemium
              </h3>
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white/80">
                0€
              </span>
            </div>

            <div className="h-px bg-white/[0.06] mb-5" />

            <ul className="space-y-2.5 mb-6">
              {freemiumFeatures.map((f, i) => (
                <li
                  key={i}
                  className="text-[15px] text-white/40 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[10px] before:w-1.5 before:h-px before:bg-white/20"
                >
                  {f}
                </li>
              ))}
            </ul>

            <button className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white/70 border border-white/[0.08] hover:border-white/20 hover:text-white transition-all duration-300">
              Commencer gratuitement
            </button>
          </motion.div>

          {/* PREMIUM */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false, margin: "-100px" }}
            className="bg-[#353331] border border-[#2E2E2E] rounded-[32px] p-6 sm:p-8 hover:rotate-0 transition-transform duration-500 relative"
          >
            {/* Small primary accent */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-3 h-3 rounded-full bg-primary-500" />

            <div className="flex items-baseline justify-between mb-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Premium
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  4,99€
                </span>
                <span className="text-sm text-white/25">/mois</span>
              </div>
            </div>

            <div className="h-px bg-white/[0.06] mb-5" />

            <ul className="space-y-2 mb-6">
              {premiumFeatures.map((f, i) => (
                <li
                  key={i}
                  className="text-[15px] text-white/50 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[10px] before:w-1.5 before:h-px before:bg-primary-500/60"
                >
                  {f}
                </li>
              ))}
            </ul>

            <button className="w-full py-3.5 rounded-2xl text-[15px] font-semibold text-white bg-primary-500 hover:bg-primary-400 transition-colors duration-300">
              Passer Premium
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Abonnements;
