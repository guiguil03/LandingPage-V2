import React from 'react';
import phone from '../assets/Phone1.png';
import course from '../assets/course.jpg';
import test from '../assets/test.png';
export default function Grille() {
  return (
    <div className='w-full min-h-screen bg-gray-100 p-6 flex flex-col items-center'>
      <h1 className='text-2xl font-bold mb-6'>Pourquoi choisir Unify et pas les autres ?</h1>
      <div className='grid grid-cols-3 gap-4 w-full max-w-5xl grid-rows-3 auto-rows-min'>
        
        <div className='bg-white p-4 rounded-2xl shadow-md flex flex-col items-center col-span-1 row-span-2'>
          <p className='text-lg font-semibold'>Personnalisez votre visibilité</p>
          <img src={phone} alt='Visibilité' className='w-full mt-2' />
        </div>
        <div className='bg-white p-4 rounded-2xl shadow-md text-center flex flex-col justify-center col-span-1'>
          <p className='text-lg font-semibold'>Battez vos records</p>
          <div className='bg-gray-100 p-3 mt-2 rounded-lg shadow-sm'>
            <div className='grid grid-cols-2 border-b pb-2 mb-2'>
              <div>
                <p className='text-xs text-gray-500'>Distance</p>
                <p className='text-lg font-bold'>5.01 km</p>
              </div>
              <div className='text-right'>
                <p className='text-xs text-gray-500'>Avg Pace</p>
                <p className='text-lg font-bold'>4:01 /km</p>
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div>
                <p className='text-xs text-gray-500'>Moving Time</p>
                <p className='text-lg font-bold'>20:08</p>
              </div>
              <div className='text-right'>
                <p className='text-xs text-gray-500'>Elevation Gain</p>
                <p className='text-lg font-bold'>18 m</p>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-2xl shadow-md flex flex-col items-center justify-center col-span-1 row-span-1'>
          <p className='text-lg font-semibold text-center mb-2'>🇪🇺 Application disponible dans toute l'Europe</p>
          <img src={test} alt='Application' className='w-[300px] h-[150px]' />
        </div>

        <div className='bg-white p-4 rounded-2xl shadow-md text-center flex flex-col justify-center col-span-2'>
          <p className='text-lg font-semibold'>AI speaker recognition</p>
          <p className='text-sm mt-2'>Identify speakers in meetings</p>
        </div>

        <div className='bg-white p-4 rounded-2xl shadow-md flex items-center justify-center col-span-1'>
          <p className='text-lg font-semibold'>🔒 GDPR compliant</p>
        </div>

        <div className='bg-white p-4 rounded-2xl shadow-md flex items-center justify-center col-span-1'>
          <p className='text-lg font-semibold'>🌍 Supportez par 20 langues</p>
        </div>

        <div className='bg-white p-4 rounded-2xl shadow-md flex items-center justify-center col-span-1 row-span-2'>
          <img src={course} alt='Visibilité' className='w-full h-full mt-2' />
        </div>

        <div className='bg-white p-4 rounded-2xl shadow-md text-center flex flex-col justify-center col-span-2'>
          <p className='text-lg font-semibold'>Ask questions across meetings</p>
          <p className='text-sm mt-2'>Get updates on discussions</p>
        </div>
      </div>
    </div>
  );
}
