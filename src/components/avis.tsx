import React, { useState, useEffect } from 'react';
import data from '../data/avis.json';
import Avis from "../type/avis";
import { motion } from 'framer-motion';

interface AvisGridProps {
  avis: Avis[];
}

const Avis: React.FC<AvisGridProps> = () => {
  const [avisData, setAvisData] = useState(data.avis);
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
      <div key={index} className="avis-item-container h-[200px] relative">
        <motion.div
          className="avis-item"
          initial={{ opacity: 0, translateY: 100, rotate: -2 }}
          animate={{ opacity, translateY }}
          transition={{ duration: 0.5, delay: index * 0.5 }}
        >
          <div 
            className={`mb-4 w-[${index % 2 === 0 ? '600px' : '500px'}] h-full bg-white text-red-500 text-2xl p-4 rounded-3xl shadow-md sm:min-w-20`}
          >
            <img className="object-cover rounded-xl shadow-md" src={avis.image} alt={avis.nom} />
            {avis.nom} {avis.prenom} <br></br>{avis.commentaire}
          </div>
        </motion.div>
      </div>
    );
  });

  return (
    <div className='w-full h-max-7xl bg-gray-100 p-6 flex flex-col items-center sm:12'>
      <div className='w-full max-w-7xl p-6 m-4 bg-white rounded-2xl shadow-md flex flex-col items-center sm:col-span-1 lg:col-span-1 lg:row-span-2 '>
        <p className='avis-container text-3xl font-semibold'>Vous avez adopté la course avec <span className="text-red-500 font-bold text-5xl"> Unify</span></p>
      </div>
      <div className=' h-[1000px] maxp-6 m-4  rounded-2xl flex flex-col items-center sm:col-span-1 lg:col-span-1 lg:row-span-2'>
        <h2 className='text-lg font-semibold h-min-7xl'>Avis de nos clients</h2>
          {avisElements}
        </div>
    </div>
  );
};

export default Avis;