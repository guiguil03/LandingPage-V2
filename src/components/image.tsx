import imgFooter from "../assets/FEMME_FORET_LOGO.png"
import Logo3 from "../assets/logo3.svg"

export default function ImageSection() {
  return (
    <div className='relative w-full h-[750px]' style={{
      backgroundImage: `url(${imgFooter})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
      {/* Overlay to improve text readability */}
      <div className='absolute inset-0 bg-black bg-opacity-30'></div>
      
      <div className='relative z-10 flex justify-center flex-col items-center h-full'>
        <div className='text-center max-w-xl px-4'>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>Courrez avec Unify</h2>
          <p className='text-lg text-white mb-8 max-w-md mx-auto'>Rejoignez notre communauté de coureurs et découvrez une nouvelle façon de pratiquer votre passion</p>
          <button className='bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-xl text-lg font-medium transition-all shadow-lg transform hover:scale-105'>
            Je veux vous rejoindre
          </button>
        </div>
      </div>
    </div>
  )
}

