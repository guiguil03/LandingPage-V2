import React from "react";

import imgAssistanceSm from "../assets/assistance-sm.jpg";
import imgAssistanceLg from "../assets/assistance-lg.jpg";
import imgArtHurLocal from "../assets/arthur.png";
import imgMaaathildaLocal from "../assets/mathilda.png";
// TODO: remplacer par des fichiers locaux
const imgIPhone = "";
const imgArtHur = imgArtHurLocal;
const imgMaaathilda = imgMaaathildaLocal;
const imgMap = "";
const imgHandshake = "";
const imgShield = "";
const imgPin1 = "";
const imgPin2 = "";

function ProfileRow({
  img,
  name,
}: {
  img: string;
  name: string;
}) {
  return (
    <div className="flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-3">
        <img src={img} alt={name} className="w-10 h-10 rounded-full object-cover" />
        <span className="font-extrabold text-[#201a41] text-sm">{name}</span>
      </div>
      <button className="bg-[#7d80f4] text-white text-xs font-extrabold px-4 py-2 rounded-full">
        Inviter
      </button>
    </div>
  );
}

const BentoGrid: React.FC = () => {
  return (
    <section id="bento" className="bg-gray-100 px-4 md:px-[52px] py-12 min-h-screen md:h-screen flex flex-col">
      {/* Desktop: grid 3 colonnes, Mobile: stack */}
      <div
        className="grid gap-3 grid-cols-1 md:grid-cols-3 flex-1 min-h-0"
      >
        {/* 1. Modes de connexion — colonne gauche, pleine hauteur */}
        <div
          className="md:row-span-3 rounded-[30px] overflow-hidden relative flex flex-col p-8 min-h-[420px] md:min-h-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(53,51,49,0.85) 0%, rgba(0,0,0,0) 60%), rgba(153,153,153,0.25)",
          }}
        >
          <h3 className="text-white font-black uppercase text-[28px] leading-tight shrink-0">
            Modes de<br />connexion
          </h3>
          <div className="flex-1 relative mt-4 min-h-[260px]">
            <img
              src={imgIPhone}
              alt="App Unify"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full object-contain object-bottom"
            />
          </div>
        </div>

        {/* 2. Nombre de rencontre limitée à 2 — colonne centrale, haut */}
        <div
          className="rounded-[30px] overflow-hidden relative flex flex-col p-6 gap-4 min-h-[220px] md:min-h-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(51,51,51,0.7) 0%, rgba(51,51,51,0) 100%), rgba(153,153,153,0.25)",
          }}
        >
          <h3 className="text-white font-black uppercase text-[22px] leading-tight">
            Nombre de rencontre<br />limitée à 2
          </h3>
          <div className="bg-[#eae3f4] rounded-xl overflow-hidden divide-y divide-[#d4cce8]">
            <ProfileRow img={imgArtHur} name="Art_hur" />
            <ProfileRow img={imgMaaathilda} name="Maaathilda" />
          </div>
          <span className="text-[#7d80f4] font-extrabold text-sm">Autour de vous</span>
        </div>

        {/* 3. Matchmaking instantané — colonne droite, haut */}
        <div
          className="rounded-[30px] overflow-hidden relative flex items-center gap-5 p-6 min-h-[160px] md:min-h-0"
          style={{ background: "rgba(153,153,153,0.25)" }}
        >
          <img src={imgHandshake} alt="" className="w-20 h-20 shrink-0 opacity-70" />
          <h3 className="text-white font-medium text-[22px] leading-tight">
            Matchmaking<br />instantané
          </h3>
        </div>

        {/* 4. Partage de position — colonne centrale, bas (row-span-2) */}
        <div
          className="md:row-span-2 rounded-[30px] overflow-hidden relative flex flex-col p-6 min-h-[320px] md:min-h-0"
        >
          <img
            src={imgMap}
            alt="Carte"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(53,51,49,0.7)] via-transparent to-transparent" />
          <h3 className="relative z-10 text-white font-black uppercase text-[28px] leading-tight">
            Partage de position
          </h3>
          {/* Pins sur la carte */}
          <div className="relative z-10 flex-1">
            <img
              src={imgPin1}
              alt=""
              className="absolute top-[15%] left-[20%] w-16 h-16 rounded-full border-[3px] border-white object-cover shadow-lg"
            />
            <img
              src={imgPin2}
              alt=""
              className="absolute top-[40%] left-[50%] w-16 h-16 rounded-full border-[3px] border-white object-cover shadow-lg"
            />
          </div>
        </div>

        {/* 5. Vérification d'identité — colonne droite, milieu */}
        <div
          className="rounded-[30px] overflow-hidden relative flex items-center justify-between p-6 min-h-[160px] md:min-h-0"
          style={{ background: "rgba(153,153,153,0.25)" }}
        >
          <h3 className="text-white font-medium text-[22px] leading-tight">
            Vérification<br />d'identité
          </h3>
          <img src={imgShield} alt="" className="w-24 h-24 shrink-0 opacity-70" />
        </div>

        {/* 6. Assistance — colonne droite, bas */}
        <div className="rounded-[30px] overflow-hidden relative flex items-end p-6 min-h-[160px] md:min-h-0">
          <picture className="absolute inset-0 w-full h-full">
            <source srcSet={imgAssistanceLg} media="(min-width: 768px)" />
            <img src={imgAssistanceSm} alt="Assistance" className="w-full h-full object-cover" />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h3 className="relative z-10 text-white font-medium text-[22px]">Assistance</h3>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
