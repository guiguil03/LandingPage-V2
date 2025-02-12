import imgFooter from "../assets/FEMME_FORET_LOGO.png"
export default function footer() {
  return (
    <div className='w-full h-[750px] bg-gray-100 text-center ' style={{backgroundImage: `url(${imgFooter})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div className='flex justify-center flex-col items-center py-12 pt-12' >
          <p className='text-center text-black-500 font-boldtext-sm'>Courrez avec Unify</p>
          <div className=" flex flex-col items-center">
          <button className='bg-red-500 hover:bg-red-600 text-white px-12 py-2 rounded-full'>Je veux vous rejoindre</button>

          </div>
        </div>
      </div>
      
    
  )
}

