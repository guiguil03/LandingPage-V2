// Footer component
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import {
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaEnvelope,
  FaAppStore,
  FaGooglePlay,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="w-full text-white py-12 border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        {/* Logo and Copyright */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center mb-3">
            <img
              src={Logo}
              alt="Logo Unify"
              className="h-10 sm:h-14 w-auto object-contain"
            />
            <span className="text-2xl font-extrabold ml-3 text-primary-500">
              UNIFY
            </span>
          </div>
          <p className="text-sm text-gray-400">
            Votre communauté de course à pied
          </p>
        </div>

        {/* Menu */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-bold mb-2 text-white">Menu</h3>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-primary-500 transition-colors duration-300"
          >
            Accueil
          </a>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-primary-500 transition-colors duration-300"
          >
            À propos
          </a>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-primary-500 transition-colors duration-300"
          >
            Nos abonnements
          </a>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-primary-500 transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        {/* Social Media & App Store */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-bold mb-2 text-white">Suivez-nous</h3>
          <div className="flex space-x-4 mb-6">
            <a
              href="#"
              className="text-gray-400 hover:text-primary-500 transition-colors duration-300"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-primary-500 transition-colors duration-300"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-primary-500 transition-colors duration-300"
            >
              <FaTiktok size={20} />
            </a>
            <a
              href="mailto:contact@unify.com"
              className="text-gray-400 hover:text-primary-500 transition-colors duration-300"
            >
              <FaEnvelope size={20} />
            </a>
          </div>

          <h3 className="text-lg font-bold mb-2 text-white">Télécharger</h3>
          <div className="flex flex-col space-y-2">
            <a
              href="#"
              className="flex items-center bg-dark text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              <FaAppStore className="mr-2" size={18} />
              <span className="text-xs">App Store</span>
            </a>
            <a
              href="#"
              className="flex items-center bg-dark text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              <FaGooglePlay className="mr-2" size={18} />
              <span className="text-xs">Google Play</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full border-t border-gray-800 mt-10 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 sm:mb-0">
            © {currentYear} UNIFY — Tous droits réservés
          </p>
          <div className="flex space-x-6">
            <Link
              to="/conditions-generales"
              className="text-xs text-gray-500 hover:text-white transition-colors duration-300"
            >
              Conditions d'utilisation
            </Link>
            <Link
              to="/mentions-legales"
              className="text-xs text-gray-500 hover:text-white transition-colors duration-300"
            >
              Mentions légales
            </Link>
            <Link
              to="/politique-de-confidentialite"
              className="text-xs text-gray-500 hover:text-white transition-colors duration-300"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
