  import React, { useState, useEffect } from 'react';
import data from '../data/avis.json';
import Avis from "../type/avis";
import { motion } from 'framer-motion';

interface AvisGridProps {
  avis?: Avis[];
}

const Avis: React.FC<AvisGridProps> = ({ avis: externalAvis }) => {
  const [avisData] = useState(externalAvis || data.avis);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const avisContainer = document.querySelector('.avis-container');
    if (avisContainer) {
      setThreshold(avisContainer.offsetTop - 400); 
    }
  }, []);

  const avisElements = avisData.map((avis, index) => {
    const opacity = scrollPosition > (threshold + index * 100) ? 1 : 0;
    const translateY = scrollPosition > (threshold + index * 100) ? 0 : 100;

    return (
      <div key={index} className="avis-item-container relative mb-8 w-full px-4">
        <motion.div
          className="avis-item w-full"
          initial={{ opacity: 0, translateY: 100 }}
          animate={{ opacity, translateY }}
          transition={{ duration: 0.5, delay: index * 0.5 }}
        >
          <div
            className={`mb-4 ${index % 2 === 0 ? "ml-auto" : "mr-auto"} w-full max-w-[600px] sm:max-w-[500px] md:max-w-[600px] bg-[#1E1E1E] text-white p-4 sm:p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4`}
          >
            <div className="flex-shrink-0">
              <img 
                className="w-16 h-16 sm:w-12 sm:h-12 object-cover rounded-full border-2 border-red-500 shadow-md" 
                src={avis.image} 
                alt={avis.nom} 
              />
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <p className="font-bold text-lg sm:text-base md:text-lg">{avis.prenom} {avis.nom}</p>
              <p className="text-sm text-gray-300 mt-2 sm:mt-1 line-clamp-6 sm:line-clamp-none">"{avis.commentaire}"</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  });

  return (
    <div className='w-full bg-gray-100 py-8 sm:py-12 flex flex-col items-center'> 
      <div className='w-full max-w-7xl p-4 sm:p-6 mb-6 sm:mb-8 bg-white rounded-2xl shadow-md flex flex-col items-center'>
        <p className='avis-container text-2xl sm:text-3xl font-semibold text-center'>Vous avez adopté la course avec <span className="text-red-500 font-bold text-3xl sm:text-5xl"> Unify</span></p>
      </div>
      <div className='w-full max-w-7xl px-4 sm:px-6 flex flex-col items-center'>
        <h2 className='text-xl sm:text-2xl font-bold mb-6 sm:mb-10 text-center'>Avis de nos clients</h2>
        <div className='w-full flex flex-col items-center'>
          {avisElements}
        </div>
      </div>
    </div>
  );
};

export default Avis;