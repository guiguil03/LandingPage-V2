import React from 'react';
import course from '../assets/course.jpg';
import iphone from '../assets/iPhone X.svg';
import map from '../assets/Background.svg'
import record from '../assets/Group 55.svg'
export default function Grille() {
  return (
    <div className='w-full min-h-screen bg-gray-100 p-6 flex flex-col items-center sm:12'>
      <h1 className='text-2xl font-bold mb-6'>Pourquoi choisir Unify et pas les autres ?</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl auto-rows-min'>
        
      <div className='bg-gradient-to-b from-[#403f3f] to-[#D9D9D9] p-4 rounded-2xl shadow-md flex flex-col items-center sm:col-span-1 lg:col-span-1 lg:row-span-2'>
  <p className='text-lg font-semibold'>Personnalisez votre visibilité</p>
  <img src={iphone} alt='Visibilité' className='w-full h-[350px] mt-2' />
</div>

        <div className='bg-gradient-to-b from-[#353331] to-[#D9D9D9] p-4 rounded-2xl shadow-md text-center flex flex-col justify-center sm:col-span-1 lg:col-span-1'>
          <p className='text-lg font-semibold'>Battez vos records</p>
          <img src={record} alt='Visibilité' className='w-full h-full' />
          
        </div>

        <div className='bg-white p-4 rounded-2xl shadow-md flex flex-col items-center justify-center  '>
          <p className=' font-semibold text-center mb-2'>🇪🇺 Application disponible dans toute l'Europe</p>
        </div>

        <div className='bg-white p-4 rounded-2xl shadow-md text-center flex flex-col justify-center  '>
        <img src={map} alt='Application' className='w-auto h-auto' />

        </div>

        <div className='bg-white p-4 rounded-2xl shadow-md flex items-center justify-center  '>
          <p className=' font-semibold'>🔒 GDPR compliant</p>
        </div>

        <div className='bg-white p-4 rounded-2xl shadow-md flex items-center justify-center '>
          <p className='text-lg font-semibold'>🌍 Supportez par 20 langues</p>
        </div>

        <div className='bg-white p-4 rounded-2xl shadow-md flex items-center justify-center  '>
          <img src={course} alt='Visibilité' className='w-full h-full mt-2' />
        </div>

        <div className='bg-white p-4 rounded-2xl shadow-md text-center flex flex-col justify-center  '>
          <p className='text-lg font-semibold'>Ask questions across meetings</p>
          <p className='text-sm mt-2'>Get updates on discussions</p>
        </div>
      </div>
    </div>
  );
}
