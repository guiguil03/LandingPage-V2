import React, { useState, useRef, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import AppMockup from "./AppMockup";

import imgAssistanceSm from "../assets/assistance-sm.jpg";
import imgAssistanceLg from "../assets/assistance-lg.jpg";
import imgMatchmaking from "../assets/matchmaking.png";
import imgArtHurLocal from "../assets/arthur.png";
import imgMaaathildaLocal from "../assets/mathilda.png";
import imgMapSm from "../assets/map-sm.jpg";
import imgMapLg from "../assets/map.jpg";
const imgArtHur = imgArtHurLocal;
const imgMaaathilda = imgMaaathildaLocal;
const imgHandshake = imgMatchmaking;
const imgShield = "";
const imgPin1 = imgArtHurLocal;
const imgPin2 = imgMaaathildaLocal;

function ProfileRow({
  img,
  name,
  distance,
}: {
  img: string;
  name: string;
  distance: string;
}) {
  const [loading, setLoading] = useState(false);
  const [invited, setInvited] = useState(false);

  const handleInvite = () => {
    if (loading || invited) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setInvited(true);
      setTimeout(() => setInvited(false), 2500);
    }, 1200);
  };

  return (
    <div className="@container flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-3">
        <img src={img} alt={name} className="w-10 h-10 rounded-full object-cover" />
        <span className="font-extrabold text-[#201a41] text-sm">{name}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden @[260px]:block text-[#7d80f4] text-xs font-semibold">{distance}</span>
        <button
        onClick={handleInvite}
        className={`text-xs font-extrabold px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
          invited
            ? "bg-primary-700 text-white scale-95"
            : "bg-[#7d80f4] hover:bg-[#6a6de0] hover:scale-105 active:scale-95 text-white"
        }`}
      >
        {loading && (
          <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        )}
        {invited ? "Invité ✓" : "Inviter"}
        </button>
      </div>
    </div>
  );
}

function DraggableMap({ srcSm, srcLg, children }: { srcSm: string; srcLg: string; children?: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startY: 0 });
  const RESISTANCE = 0.55;
  const MAX = 80;

  const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v));

  const onStart = useCallback((clientX: number, clientY: number) => {
    gsap.killTweensOf(contentRef.current);
    const cx = gsap.getProperty(contentRef.current, "x") as number;
    const cy = gsap.getProperty(contentRef.current, "y") as number;
    drag.current = { active: true, startX: clientX - cx / RESISTANCE, startY: clientY - cy / RESISTANCE };
  }, []);

  const onMove = useCallback((clientX: number, clientY: number) => {
    if (!drag.current.active || !contentRef.current) return;
    const dx = clamp((clientX - drag.current.startX) * RESISTANCE);
    const dy = clamp((clientY - drag.current.startY) * RESISTANCE);
    gsap.set(contentRef.current, { x: dx, y: dy });
  }, []);

  const onEnd = useCallback(() => {
    if (!drag.current.active) return;
    drag.current.active = false;
    gsap.to(contentRef.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(0.3, 0.6)" });
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", handleTouchMove);
  }, [onMove]);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 z-10 overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={(e) => onStart(e.clientX, e.clientY)}
      onMouseMove={(e) => onMove(e.clientX, e.clientY)}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchStart={(e) => onStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={onEnd}
    >
      <div ref={contentRef} className="absolute inset-0 scale-[1.6] origin-center">
        <picture className="absolute inset-0 w-full h-full pointer-events-none">
          <source srcSet={srcLg} media="(min-width: 768px)" />
          <img src={srcSm} alt="Carte" draggable={false} className="w-full h-full object-cover" />
        </picture>
        {children}
      </div>
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
            Tu choisis<br />avec qui tu cours.
          </h3>
          <div className="flex-1 relative mt-4 min-h-[260px] -mb-8">
            <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
              <AppMockup className="h-full translate-y-[20%]" />
            </div>
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
            Matche en<br />quelques secondes.
          </h3>
          <div className="bg-[#eae3f4] rounded-xl overflow-hidden divide-y divide-[#d4cce8]">
            <ProfileRow img={imgArtHur} name="Art_hur" distance="350 m" />
            <ProfileRow img={imgMaaathilda} name="Maaathilda" distance="1.2 km" />
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
          <DraggableMap srcSm={imgMapSm} srcLg={imgMapLg}>
            <img src={imgPin1} alt="" draggable={false} className="absolute top-[35%] left-[35%] w-10 h-10 rounded-full border-2 border-white object-cover shadow-lg pointer-events-none" />
            <img src={imgPin2} alt="" draggable={false} className="absolute top-[55%] left-[62%] w-10 h-10 rounded-full border-2 border-white object-cover shadow-lg pointer-events-none" />
          </DraggableMap>
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(53,51,49,0.7)] via-transparent to-transparent pointer-events-none z-20" />
          <h3 className="relative z-20 text-white font-black uppercase text-[28px] leading-tight pointer-events-none">
            Vois qui court<br />en ce moment.
          </h3>
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
