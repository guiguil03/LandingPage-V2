// Footer component

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full bg-[#333333] text-white py-10'>
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8'>
        {/* Logo and Copyright */}
        <div className='flex flex-col space-y-4'>
          <div className='flex items-center'>
            <div className='text-red-500 text-5xl font-bold'>ü</div>
          </div>
          <p className='text-sm'>© {currentYear} UNIFY</p>
          <p className='text-sm'>Tous droits réservés</p>
          <p className='text-sm'>Politique de confidentialité</p>
        </div>

        {/* Menu */}
        <div className='flex flex-col space-y-4'>
          <h3 className='font-bold text-lg'>MENU</h3>
          <ul className='space-y-2'>
            <li><a href='#' className='text-sm hover:text-red-500 transition-colors'>UNIFY</a></li>
            <li><a href='#' className='text-sm hover:text-red-500 transition-colors'>Abonnements</a></li>
            <li><a href='#' className='text-sm hover:text-red-500 transition-colors'>Nous contacter</a></li>
            <li><a href='#' className='text-sm hover:text-red-500 transition-colors'>Tarifs</a></li>
          </ul>
        </div>

        {/* Suivez-nous */}
        <div className='flex flex-col space-y-4'>
          <h3 className='font-bold text-lg'>SUIVEZ-NOUS</h3>
          <ul className='space-y-2'>
            <li><a href='#' className='text-sm hover:text-red-500 transition-colors'>Facebook</a></li>
            <li><a href='#' className='text-sm hover:text-red-500 transition-colors'>X</a></li>
            <li><a href='#' className='text-sm hover:text-red-500 transition-colors'>Instagram</a></li>
          </ul>
        </div>

        {/* Vous commencez? */}
        <div className='flex flex-col space-y-4'>
          <h3 className='font-bold text-lg'>VOUS COMMENCEZ ?</h3>
          <ul className='space-y-2'>
            <li><a href='#' className='text-sm hover:text-red-500 transition-colors'>S'inscrire</a></li>
            <li><a href='#' className='text-sm hover:text-red-500 transition-colors'>Se connecter</a></li>
          </ul>
          <div className='flex flex-col space-y-3 mt-4'>
            <a href='#' className='block'>
              <img src='https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg' alt='Download on App Store' className='h-10' />
            </a>
            <a href='#' className='block'>
              <img src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' alt='Get it on Google Play' className='h-10' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
