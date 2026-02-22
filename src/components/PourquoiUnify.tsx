import React from "react";
import imgRunner from "../assets/runner.png";
import imgFond from "../assets/fond.png";

const PourquoiUnify: React.FC = () => {
  const textContent = (
    <div className="flex flex-col gap-6 md:max-w-[480px]">
      <h2 className="text-white text-3xl md:text-[29px] font-black uppercase leading-tight tracking-tight">
        Pourquoi choisir Unify
        <br />
        et pas les autres ?
      </h2>
      <p className="text-[#fbfbfb] text-[15px] leading-relaxed">
        Unify est une application de running social qui révolutionne la façon
        dont les coureurs se connectent. En plus de permettre l'enregistrement
        de vos courses, Unify vous aide à rencontrer d'autres passionnés de
        course à pied en fonction de votre niveau, de vos centres d'intérêt et
        bien plus encore. Avec un focus sur l'aspect social et la visibilité des
        autres utilisateurs, Unify transforme chaque course en une opportunité
        de partager, d'échanger et de tisser des liens.
      </p>
      <div className="flex gap-3 flex-wrap">
        <button className="bg-[#7D80F4] text-white font-semibold text-[15px] px-12 py-[10px] rounded-full hover:bg-[#7D80F4]/85 transition-colors duration-300">
          Télécharger
        </button>
        <button className="border border-white/60 text-white font-semibold text-[15px] px-12 py-[10px] rounded-full hover:bg-white/10 transition-colors duration-300">
          En savoir plus
        </button>
      </div>
    </div>
  );

  return (
    <section className="relative bg-[#353331] overflow-hidden min-h-[400px]">
      <img
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none select-none"
        src={imgFond}
      />

      {/* Desktop layout */}
      <div className="hidden md:flex relative z-10 min-h-[585px] items-center">
        <div className="pl-[104px] flex-1 max-w-[52%]">
          {textContent}
        </div>
        <div
          className="absolute right-0 top-0 h-full"
          style={{ width: "calc(55% + 60px)" }}
        >
          <img
            alt="Coureur Unify"
            className="absolute inset-0 w-full h-full object-contain object-right-bottom"
            src={imgRunner}
          />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden flex-col relative z-10 py-14 px-6 gap-10">
        {textContent}
        <div
          className="relative w-full"
        >
          <img
            alt="Coureur Unify"
            className="w-full h-auto"
            src={imgRunner}
          />
        </div>
      </div>
    </section>
  );
};

export default PourquoiUnify;
