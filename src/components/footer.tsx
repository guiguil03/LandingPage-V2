// Footer component
import Logo from "../assets/logo.svg"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaAppStore, FaGooglePlay } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className='w-full text-white py-12 border-t border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12'>
        {/* Logo and Copyright */}
        <div className='flex flex-col space-y-4'>
          <div className='flex items-center mb-3'>
            <div className='bg-white p-2 rounded-xl shadow-md'>
              <img src={Logo} alt='Logo Unify' className='w-12 h-12 sm:w-14 sm:h-14' />
            </div>
            <span className='text-2xl font-extrabold ml-3 text-red-500'>UNIFY</span>
          </div>
          <p className='text-sm text-gray-400'>© {currentYear} UNIFY</p>
          <p className='text-sm text-gray-400'>Tous droits réservés</p>
          <p className='text-sm text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer'>Politique de confidentialité</p>
        </div>

        {/* Menu */}
        <div className='flex flex-col space-y-3'>
          <h3 className='text-lg font-bold mb-2 text-white'>Menu</h3>
          <a href='#' className='text-sm text-gray-400 hover:text-red-500 transition-colors duration-300'>Accueil</a>
          <a href='#' className='text-sm text-gray-400 hover:text-red-500 transition-colors duration-300'>À propos</a>
          <a href='#' className='text-sm text-gray-400 hover:text-red-500 transition-colors duration-300'>Nos abonnements</a>
          <a href='#' className='text-sm text-gray-400 hover:text-red-500 transition-colors duration-300'>Contact</a>
        </div>

        {/* Contact */}
        <div className='flex flex-col space-y-3'>
          <h3 className='text-lg font-bold mb-2 text-white'>Contact</h3>
          <p className='text-sm text-gray-400 flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            contact@unify.com
          </p>
          <p className='text-sm text-gray-400 flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +33 1 23 45 67 89
          </p>
        </div>

        {/* Social Media & App Store */}
        <div className='flex flex-col space-y-3'>
          <h3 className='text-lg font-bold mb-2 text-white'>Suivez-nous</h3>
          <div className='flex space-x-4 mb-6'>
            <a href='#' className='text-gray-400 hover:text-red-500 transition-colors duration-300'>
              <FaFacebook size={20} />
            </a>
            <a href='#' className='text-gray-400 hover:text-red-500 transition-colors duration-300'>
              <FaTwitter size={20} />
            </a>
            <a href='#' className='text-gray-400 hover:text-red-500 transition-colors duration-300'>
              <FaInstagram size={20} />
            </a>
            <a href='#' className='text-gray-400 hover:text-red-500 transition-colors duration-300'>
              <FaLinkedin size={20} />
            </a>
          </div>
          
          <h3 className='text-lg font-bold mb-2 text-white'>Télécharger</h3>
          <div className='flex flex-col space-y-2'>
            <a href='#' className='flex items-center bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300'>
              <FaAppStore className='mr-2' size={18} />
              <span className='text-xs'>App Store</span>
            </a>
            <a href='#' className='flex items-center bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300'>
              <FaGooglePlay className='mr-2' size={18} />
              <span className='text-xs'>Google Play</span>
            </a>
          </div>
        </div>

    
      </div>
      
      {/* Bottom bar */}
      <div className='w-full border-t border-gray-800 mt-10 pt-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center'>
          <p className='text-xs text-gray-500 mb-4 sm:mb-0'>Unify Running - Votre application de course à pied personnalisée</p>
          <div className='flex space-x-6'>
            <a href='#' className='text-xs text-gray-500 hover:text-white transition-colors duration-300'>Conditions d'utilisation</a>
            <a href='#' className='text-xs text-gray-500 hover:text-white transition-colors duration-300'>Mentions légales</a>
            <a href='#' className='text-xs text-gray-500 hover:text-white transition-colors duration-300'>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
