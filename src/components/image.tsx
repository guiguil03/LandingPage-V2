import imgFooter from "../assets/femme.png"

export default function ImageSection() {
  return (
    <div className='relative w-full h-[750px]' style={{
      backgroundImage: `url(${imgFooter})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
      {/* Overlay to improve text readability */}
      <div className='absolute inset-0 bg-dark bg-opacity-30'></div>
      
      <div className='relative z-10 flex justify-center flex-col items-center h-full'>
        <div className='text-center max-w-xl px-4'>
          <div className='flex items-center justify-center gap-4 mb-6'>
            <h2 className='text-4xl md:text-5xl font-bold text-white'>Courrez avec Unify</h2>
          </div>
          <p className='text-lg text-white mb-8 max-w-md mx-auto'>Rejoignez notre communauté de coureurs et découvrez une nouvelle façon de pratiquer votre passion</p>
          <button className='bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-10 py-4 rounded-xl text-lg font-medium transition-all shadow-lg shadow-primary-500/50 transform hover:scale-105 hover:shadow-xl hover:shadow-primary-600/50'>
            Je veux vous rejoindre
          </button>
        </div>
      </div>
    </div>
  )
}

