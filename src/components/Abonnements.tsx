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
      className="relative h-screen flex flex-col justify-center py-6 sm:py-10 md:py-16 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8 w-full">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-4 sm:mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white">
            Rejoins le mouvement
          </h2>
          <p className="mt-2 sm:mt-4 text-white text-sm sm:text-base md:text-lg">
            Gratuit pour commencer, Premium pour aller plus loin.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid md:grid-cols-2 gap-3 sm:gap-6 md:gap-8 max-w-4xl mx-auto items-stretch">
          {/* GRATUIT */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: false, margin: "-100px" }}
            className="bg-[#7D80F4] border border-white/[0.08] rounded-2xl sm:rounded-[32px] p-4 sm:p-6 md:p-8 flex flex-col"
          >
            <div className="mb-2 sm:mb-5">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Gratuit
              </h3>
            </div>

            <div className="h-px bg-white/[0.06] mb-2 sm:mb-5" />

            <ul className="space-y-1 sm:space-y-2 mb-0">
              {freemiumFeatures.map((f, i) => (
                <li
                  key={i}
                  className="text-[13px] sm:text-[15px] text-white leading-snug sm:leading-relaxed pl-3 sm:pl-4 relative before:absolute before:left-0 before:top-[8px] sm:before:top-[10px] before:w-1.5 before:h-px before:bg-white/40"
                >
                  {f}
                </li>
              ))}
            </ul>

            {/* Ghost features — hidden on mobile to save space */}
            <div className="hidden sm:block space-y-2 mt-2 select-none" aria-hidden>
              {["Accès aux groupes privés", "Statistiques avancées", "Coaching", "Accès aux évènements"].map((f, i) => (
                <p
                  key={i}
                  className="text-[15px] text-white/60 leading-relaxed pl-4 blur-[5px]"
                >
                  {f}
                </p>
              ))}
            </div>

            <button className="w-full py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl text-[13px] sm:text-[15px] font-semibold text-white bg-transparent border border-white/20 hover:border-white/40 transition-all duration-300 mt-3 sm:mt-auto">
              Commencer gratuitement
            </button>
          </motion.div>

          {/* PREMIUM */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false, margin: "-100px" }}
            className="bg-[#201A41] border border-white/[0.08] rounded-2xl sm:rounded-[32px] p-4 sm:p-6 md:p-8 flex flex-col"
          >
            <div className="flex items-baseline justify-between mb-2 sm:mb-5">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#7D80F4]">
                Premium
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                  4,99€
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  /mois
                </span>
              </div>
            </div>

            <div className="h-px bg-white/[0.06] mb-2 sm:mb-5" />

            <ul className="space-y-1 sm:space-y-2 mb-3 sm:mb-6">
              {premiumFeatures.map((f, i) => (
                <li
                  key={i}
                  className="text-[13px] sm:text-[15px] text-white leading-snug sm:leading-relaxed pl-3 sm:pl-4 relative before:absolute before:left-0 before:top-[8px] sm:before:top-[10px] before:w-1.5 before:h-px before:bg-primary-500/60"
                >
                  {f}
                </li>
              ))}
            </ul>

            <button className="w-full py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl text-[13px] sm:text-[15px] font-semibold text-[#353331] bg-[#D5CFFB] hover:bg-[#D5CFFB]/85 transition-colors duration-300 mt-auto">
              Passer Premium
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Abonnements;
