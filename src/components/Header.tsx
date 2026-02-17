import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.png";
import SignupModal from "./inscription";

const Header: React.FC = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-screen bg-[#353331] overflow-hidden"
    >
      {/* ── Navbar (relative, not sticky) ── */}
      <div className="relative z-50 px-6 sm:px-8 pt-6 sm:pt-8 flex justify-between items-center max-w-7xl mx-auto">
        {/* Left — Logo + Title + dot */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <img
            src={Logo}
            alt="Logo Unify"
            className="h-9 sm:h-11 w-auto object-contain"
          />
          <span className="text-xl sm:text-2xl font-extrabold text-white tracking-[-0.02em]">
            UNIFY<span className="text-primary-500">.</span>
          </span>
        </motion.div>

        {/* Right — Nav links (desktop) */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-6"
        >
          <button
            onClick={() => scrollToSection("abonnements")}
            className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 cursor-pointer"
          >
            Abonnements
          </button>
          <button
            onClick={() => scrollToSection("footer")}
            className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 cursor-pointer"
          >
            Contact
          </button>
          <button
            onClick={openSignupModal}
            className="bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.08] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
          >
            S'inscrire
          </button>
        </motion.nav>

        {/* Right — Hamburger (mobile) */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </motion.button>
      </div>

      {/* ── Hero Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 h-[calc(100%-80px)] flex items-center px-6 sm:px-12 lg:px-24 w-full"
      >
        {/* Left — Text */}
        <div className="flex-1">
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-[-0.03em] leading-[0.95] text-white max-w-3xl"
          >
            Trouve ton
            <br />
            <span className="text-[#A9A0F3]">crew de runners.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 sm:mt-8 text-white text-base sm:text-lg max-w-md leading-relaxed"
          >
            Trouvez des partenaires à votre rythme, partagez vos parcours et
            rejoignez la communauté qui vous ressemble.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 sm:mt-10 flex items-center gap-4"
          >
            <button
              onClick={openSignupModal}
              className="group bg-white text-[#353331] font-semibold text-sm sm:text-base px-7 py-3.5 rounded-2xl hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2.5"
            >
              Rejoindre Unify
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => scrollToSection("abonnements")}
              className="text-white hover:text-white/70 text-sm sm:text-base font-medium transition-colors duration-200"
            >
              Voir les offres
            </button>
          </motion.div>
        </div>

        {/* Right — Mockup (hidden on small mobile, visible from sm) */}
        <motion.div
          variants={fadeUp}
          className="hidden lg:block flex-shrink-0 ml-16 xl:ml-24"
        >
          <picture>
            <source
              srcSet="/img/mockup-lg.webp"
              media="(min-width: 1280px)"
              type="image/webp"
            />
            <source
              srcSet="/img/mockup-md.webp"
              media="(min-width: 1024px)"
              type="image/webp"
            />
            <img
              src="/img/mockup-sm.webp"
              alt="Unify app mockup"
              loading="eager"
              decoding="async"
              className="h-[70vh] max-h-[700px] w-auto object-contain drop-shadow-2xl"
            />
          </picture>
        </motion.div>
      </motion.div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 right-6 z-40 w-56 bg-[#2a2826] rounded-2xl shadow-xl py-2 px-2 border border-white/[0.06]"
          >
            <button
              onClick={() => scrollToSection("abonnements")}
              className="w-full text-left text-white hover:text-white text-sm font-medium py-2.5 px-4 rounded-xl hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
            >
              Abonnements
            </button>
            <button
              onClick={() => scrollToSection("footer")}
              className="w-full text-left text-white hover:text-white text-sm font-medium py-2.5 px-4 rounded-xl hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
            >
              Contact
            </button>
            <div className="h-px bg-white/[0.06] my-1 mx-3" />
            <button
              onClick={openSignupModal}
              className="w-full bg-primary-500 hover:bg-primary-400 text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors duration-200 mt-1 cursor-pointer"
            >
              S'inscrire
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} />
    </motion.header>
  );
};

export default Header;
