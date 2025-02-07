import React from 'react'
import map from '../assets/map.jpg';

export default function Map() {
  return (
    <div className="relative h-[400px] md:h-[600px] bg-no-repeat bg-cover" style={{ backgroundImage: `url(${map})`}}>
      <div className="absolute inset-0 bg-gradient-to-r from-black to-red-600 opacity-70"></div>
      <div className="absolute inset-0 flex flex-col items-start justify-center p-4 md:p-12 lg:pl-24">
        <div className="text-left w-full md:w-3/4 lg:w-2/3">
          <h1 className="mb-6 md:mb-12 text-2xl md:text-4xl font-bold leading-tight text-white">
            POURQUOI CHOISIR UNIFY,<br />
            ET PAS LES AUTRES
          </h1>
          <p className="text-white text-sm md:text-base lg:text-lg mb-8 md:mb-12">
            Unify est une application de running social qui révolutionne la façon dont les coureurs se connectent. En plus de permettre l'enregistrement de vos courses, Unify vous aide à rencontrer d'autres passionnés de course à pied en fonction de votre niveau, de vos centres d'intérêt et bien plus encore. Avec un focus sur l'aspect social et la visibilité des autres utilisateurs, Unify transforme chaque course en une opportunité de partager, d'échanger et de tisser des liens.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
            <button className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full">
              S'inscrire maintenant
            </button>
            <button className="w-full sm:w-auto bg-white hover:bg-gray-200 text-gray-800 py-2 px-6 rounded-full">
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}