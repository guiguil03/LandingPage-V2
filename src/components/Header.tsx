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
      <div className="container mx-auto px-4">
        <div className="flex justify-center w-full">
          <motion.nav
            initial={{ x: -500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="fixed top-0 z-50 mt-4 flex justify-between items-center bg-gray-100 bg-opacity-95 backdrop-blur-sm rounded-[15px] px-4 sm:px-6 py-3 w-[95%] max-w-7xl shadow-md transition-all duration-300"
          >
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <img src={Group9} alt="Logo Unify" className="w-8 h-8 mb-4 sm:w-10 sm:h-10" />
                <span className="text-black mb-4">UNIFY</span>
              </span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <button className="text-gray-600 hover:text-gray-800 text-sm sm:text-base">
                Nos Abonnements
              </button>
              <button className="text-gray-600 hover:text-gray-800 text-sm sm:text-base">
                Contactez-Nous
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 text-1xlsm:px-6 py-2 rounded-full text-sm sm:text-base">
                Se Connecter
              </button>
              
            </div>
          </motion.nav>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mt-16 sm:mt-32 mb-16 sm:mb-32 max-w-2xl text-left text-white"
        >
          <motion.h1
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5 }}
            className="text-3xl sm:text-5xl font-bold mb-8 sm:mb-12 leading-tight"
          >
            VOTRE MOTIVATION, VOS PARTENAIRES, VOS PARCOURS : TOUS RÉUNIS !
          </motion.h1>
          <motion.button
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5 }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-lg transition-colors"
          >
            Je me lance dans l'aventure !
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;