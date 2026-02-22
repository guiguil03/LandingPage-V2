import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const handler = () => {
      setIsSignupModalOpen(true);
      setIsMobileMenuOpen(false);
    };
    window.addEventListener("openSignupModal", handler);
    return () => window.removeEventListener("openSignupModal", handler);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="relative w-full min-h-screen bg-[#353331] overflow-hidden flex flex-col">
      {/* ── Navbar ── */}
      <div className="relative z-50 w-full px-6 sm:px-8 pt-6 sm:pt-8 flex justify-between items-center max-w-7xl mx-auto">
        {/* Left — Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Logo Unify"
            className="h-9 sm:h-11 w-auto object-contain"
          />
          <span className="text-xl sm:text-2xl font-extrabold text-white tracking-[-0.02em]">
            UNIFY<span className="text-primary-500">.</span>
          </span>
        </div>

        {/* Right — Nav links (desktop) */}
        <nav className="hidden md:flex items-center gap-6">
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
            className="bg-[#EAE3F4] hover:bg-[#E0D8ED] text-[#353331] text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
          >
            S'inscrire
          </button>
        </nav>

        {/* Right — Hamburger (mobile) */}
        <button
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
        </button>
      </div>

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex-1 flex items-center px-6 sm:px-12 lg:px-24 w-full">
        {/* Left — Text */}
        <div className="flex-1">
          <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-[-0.03em] leading-[0.95] text-white max-w-3xl">
            Trouve ton
            <br />
            <span className="text-[#7D80F4]">crew de runners.</span>
          </h1>

          <p className="mt-6 sm:mt-8 text-white text-base sm:text-lg max-w-md leading-relaxed">
            Trouvez des partenaires à votre rythme, partagez vos parcours et
            rejoignez la communauté qui vous ressemble.
          </p>

          <div className="mt-8 sm:mt-10 flex items-center gap-4">
            <button
              onClick={openSignupModal}
              className="group bg-[#EAE3F4] text-[#353331] font-semibold text-sm sm:text-base px-7 py-3.5 rounded-2xl hover:bg-[#E0D8ED] transition-colors duration-200 flex items-center gap-2.5"
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
          </div>
        </div>

        {/* Right — Mockup */}
        <div className="hidden lg:block flex-shrink-0 ml-16 xl:ml-24">
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
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 right-6 z-40 w-56 bg-[#2a2826] rounded-2xl shadow-xl py-2 px-2 border border-white/[0.06]">
          <button
            onClick={() => scrollToSection("abonnements")}
            className="w-full text-left text-white text-sm font-medium py-2.5 px-4 rounded-xl hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
          >
            Abonnements
          </button>
          <button
            onClick={() => scrollToSection("footer")}
            className="w-full text-left text-white text-sm font-medium py-2.5 px-4 rounded-xl hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
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
        </div>
      )}

      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} />
    </header>
  );
};

export default Header;
