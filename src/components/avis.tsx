  import React, { useState, useEffect } from 'react';
import data from '../data/avis.json';
import Avis from "../type/avis";
import { motion } from 'framer-motion';

interface AvisGridProps {
  avis?: Avis[];
}

const Avis: React.FC<AvisGridProps> = ({ avis: externalAvis }) => {
  const [avisData, setAvisData] = useState(externalAvis || data.avis);
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
      <div key={index} className="avis-item-container h-[200px] relative mb-8">
        <motion.div
          className="avis-item"
          initial={{ opacity: 0, translateY: 100 }}
          animate={{ opacity, translateY }}
          transition={{ duration: 0.5, delay: index * 0.5 }}
        >
          <div
            className={`mb-4 ${index % 2 === 0 ? "w-[600px]" : "w-[500px]"} h-full bg-[#1E1E1E] text-white p-6 rounded-3xl shadow-lg flex items-start space-x-4`}
          >
            <div className="flex-shrink-0">
              <img 
                className="w-12 h-12 object-cover rounded-full border-2 border-red-500" 
                src={avis.image} 
                alt={avis.nom} 
              />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-lg">{avis.prenom} {avis.nom}</p>
              <p className="text-sm text-gray-300 mt-1">"{avis.commentaire}"</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  });

  return (
    <div className='w-full bg-gray-100 py-12 flex flex-col items-center'> 
      <div className='w-full max-w-7xl p-6 mb-8 bg-white rounded-2xl shadow-md flex flex-col items-center'>
        <p className='avis-container text-3xl font-semibold'>Vous avez adopté la course avec <span className="text-red-500 font-bold text-5xl"> Unify</span></p>
      </div>
      <div className='w-full max-w-7xl px-6 flex flex-col items-center'>
        <h2 className='text-2xl font-bold mb-10'>Avis de nos clients</h2>
        <div className='w-full flex flex-col items-center'>
          {avisElements}
        </div>
      </div>
    </div>
  );
};

export default Avis;