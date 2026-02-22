import React from "react";

// Figma assets — expire dans 7 jours, à remplacer par des fichiers locaux
const imgIPhone = "https://www.figma.com/api/mcp/asset/abe86435-3916-4344-8a69-8f8666589796";
const imgArtHur = "https://www.figma.com/api/mcp/asset/00644d55-91aa-4724-a37b-549a5d655e2f";
const imgMaaathilda = "https://www.figma.com/api/mcp/asset/c58991c4-c6f2-4329-a892-c47bb66029dc";
const imgMap = "https://www.figma.com/api/mcp/asset/a49cafa3-773b-4b35-b42e-de9c215b9756";
const imgHandshake = "https://www.figma.com/api/mcp/asset/1564d98f-ec63-49f3-828a-8ff19423471e";
const imgShield = "https://www.figma.com/api/mcp/asset/f0c03534-2a5d-4d9c-a262-b3729913d2e1";
const imgAssistance = "https://www.figma.com/api/mcp/asset/d8cf827d-fe0a-4d44-b2bd-7053371665be";
const imgPin1 = "https://www.figma.com/api/mcp/asset/e4aa388e-13bb-4b9f-ba48-8255a9489b84";
const imgPin2 = "https://www.figma.com/api/mcp/asset/9d2df4f7-120a-4aa0-ba42-6cc856ef3651";

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
    <section className="bg-[#353331] px-4 md:px-[52px] pb-20 pt-6">
      {/* Desktop: grid 3 colonnes, Mobile: stack */}
      <div
        className="grid gap-3 grid-cols-1 md:grid-cols-3 md:grid-rows-[200px_250px_200px]"
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
          <img
            src={imgAssistance}
            alt="Assistance"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h3 className="relative z-10 text-white font-medium text-[22px]">Assistance</h3>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
