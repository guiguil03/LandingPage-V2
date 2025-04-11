import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/logo.svg';
import SignupModal from './inscription';

const Header: React.FC = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsMobileMenuOpen(false); // Fermer le menu mobile si ouvert
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
            className="fixed top-0 left-0 z-50 mt-4 ml-4 flex justify-between items-center bg-white bg-opacity-90 backdrop-blur-md rounded-[20px] px-4 sm:px-8 py-3 sm:py-4 w-[95%] max-w-7xl shadow-lg transition-all duration-300 border border-gray-100 h-16 sm:h-[70px]"
          >
            <div className="flex items-center">
              <span className="font-bold flex items-center gap-2 sm:gap-3">
                <img src={Logo} alt="Logo Unify" className="h-10 sm:h-14 w-auto object-contain" />
                <span className="text-xl sm:text-3xl font-extrabold">UNIFY</span>
              </span>
            </div>
            
            {/* Menu pour desktop */}
            <div className="hidden md:flex items-center gap-6 sm:gap-8">
              <button className="text-gray-700 hover:text-red-600 text-sm sm:text-base font-medium relative group transition-all duration-300 flex items-center h-full">
                Nos Abonnements
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button className="text-gray-700 hover:text-red-600 text-sm sm:text-base font-medium relative group transition-all duration-300 flex items-center h-full">
                Contactez-Nous
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={openSignupModal}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 hover:from-red-600 hover:to-red-700 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                S'inscrire
              </button>
            </div>
            
            {/* Bouton hamburger pour mobile */}
            <button 
              onClick={toggleMobileMenu} 
              className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 focus:outline-none"
              aria-label="Menu"
            >
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
            </button>
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
            onClick={openSignupModal}
            className="bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-lg transition-colors hover:shadow-md transform hover:scale-105"
          >
            Je me lance dans l'aventure !
          </motion.button>
        </motion.div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-4 z-40 w-[90%] max-w-md bg-white rounded-xl shadow-xl py-4 px-6 border border-gray-100"
          >
            <div className="flex flex-col gap-4">
              <button className="text-gray-700 hover:text-red-600 text-base font-medium py-2 border-b border-gray-100 transition-all duration-300">
                Nos Abonnements
              </button>
              <button className="text-gray-700 hover:text-red-600 text-base font-medium py-2 border-b border-gray-100 transition-all duration-300">
                Contactez-Nous
              </button>
              <button 
                onClick={openSignupModal}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-full text-base font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 hover:from-red-600 hover:to-red-700 flex items-center justify-center gap-2 mt-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                S'inscrire
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal d'inscription */}
      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} />
    </motion.header>
  );
};

export default Header;