import React from 'react';
import { motion } from 'framer-motion';
import Group9 from '../assets/Group 9.svg';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full py-4"
    >
      <div className="container mx-auto px-4 -left-11">
        <div className="flex justify-center">
          <motion.nav
            initial={{ x: -500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="flex justify-between items-center bg-gray-100 rounded-full px-6 py-2 w-[800px]"
          >
            <div className="flex items-center">
              <span className="text-2xl font-bold flex items-center gap-2">
                <img src={Group9} alt="Logo Unify" className="w-10 h-10" />
                <span className="text-black">UNIFY</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <button
                className="text-gray-600 hover:text-gray-800"
              >
                Nos Abonnements
              </button>
              <button
                className="text-gray-600 hover:text-gray-800"
              >
                Contactez-Nous
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
              >
                S'enregistrer
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
              >
                Se Connecter
              </button>
            </div>
          </motion.nav>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mt-32 mb-32 max-w-2xl text-left text-white"
        >
          <motion.h1
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5 }}
            className="text-5xl font-bold mb-12 leading-tight"
          >
            VOTRE MOTIVATION, VOS PARTENAIRES,
            VOS PARCOURS : TOUS RÉUNIS !
          </motion.h1>
          <motion.button
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5 }}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg text-lg transition-colors"
          >
            Je me lance dans l'aventure !
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
