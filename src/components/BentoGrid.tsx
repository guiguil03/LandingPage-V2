import React, { useState, useRef, useCallback, useEffect } from "react";
import { flushSync } from "react-dom";
import { FiSearch, FiX, FiPhone, FiAlertTriangle, FiMessageCircle, FiUsers, FiZap, FiShield, FiCheckCircle } from "react-icons/fi";
import { gsap } from "gsap";
import { Flip } from "gsap/all";
gsap.registerPlugin(Flip);
import AppMockup from "./AppMockup";

import imgAssistanceSm from "../assets/assistance-sm.jpg";
import imgAssistanceLg from "../assets/assistance-lg.jpg";
import imgMatchmaking from "../assets/matchmaking.png";
import imgArtHurLocal from "../assets/arthur.png";
import imgMaaathildaLocal from "../assets/mathilda.png";
import imgQuentinLocal from "../assets/quentin.png";
import imgLaureLocal from "../assets/Laure.png";
import imgMapSm from "../assets/map-sm.jpg";
import imgMapLg from "../assets/map.jpg";
import imgShieldLocal from "../assets/shield.png";
const imgArtHur     = imgArtHurLocal;
const imgMaaathilda = imgMaaathildaLocal;
const imgQuentin    = imgQuentinLocal;
const imgLaure      = imgLaureLocal;
const imgHandshake  = imgMatchmaking;
const imgShield     = imgShieldLocal;
const imgPin1       = imgArtHurLocal;
const imgPin2       = imgMaaathildaLocal;

function ProfileRow({ img, name, distance }: { img: string; name: string; distance: string }) {
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
    <div className="@container flex items-center justify-between px-6 py-2.5">
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
          {loading && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
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
    const fn = (e: TouchEvent) => { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY); };
    el.addEventListener("touchmove", fn, { passive: false });
    return () => el.removeEventListener("touchmove", fn);
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

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`;

const BentoGrid: React.FC = () => {
  const bentoInnerRef     = useRef<HTMLDivElement>(null);
  const matchmakingRef    = useRef<HTMLDivElement>(null);
  const verificationRef   = useRef<HTMLDivElement>(null);
  const assistanceRef     = useRef<HTMLDivElement>(null);
  const matchmakingThumbRef  = useRef<HTMLDivElement>(null);
  const verificationThumbRef = useRef<HTMLDivElement>(null);
  const assistanceThumbRef   = useRef<HTMLDivElement>(null);
  const overlayContentRef = useRef<HTMLDivElement>(null);
  const activeCardRef     = useRef<string | null>(null);
  const isAutoScrollingRef = useRef(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const closeCard = useCallback(() => {
    if (!activeCardRef.current || isAutoScrollingRef.current) return;
    const currentId = activeCardRef.current;
    activeCardRef.current = null;

    let card: HTMLDivElement | null = null;
    let thumb: HTMLDivElement | null = null;
    if (currentId === "matchmaking") { card = matchmakingRef.current; thumb = matchmakingThumbRef.current; }
    if (currentId === "verification") { card = verificationRef.current; thumb = verificationThumbRef.current; }
    if (currentId === "assistance") { card = assistanceRef.current; thumb = assistanceThumbRef.current; }
    
    if (!card) return;

    const doClose = () => {
      const state = Flip.getState(card);
      flushSync(() => setActiveCard(null));

      if (thumb) {
        gsap.to(thumb, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
      }

      Flip.from(state, {
        duration: 0.65,
        ease: "power4.inOut",
        absolute: true,
        zIndex: 50,
        onComplete: () => {
          gsap.set(card, { clearProps: "all" });
          if (thumb) gsap.set(thumb, { clearProps: "all" });
        },
      });
    };

    if (overlayContentRef.current) {
      gsap.to(overlayContentRef.current, { autoAlpha: 0, y: 15, duration: 0.2, ease: "power2.in", onComplete: doClose });
    } else {
      doClose();
    }
  }, []);

  const openCard = useCallback((id: string) => {
    if (activeCardRef.current) return;
    activeCardRef.current = id;

    let card: HTMLDivElement | null = null;
    let thumb: HTMLDivElement | null = null;
    if (id === "matchmaking") { card = matchmakingRef.current; thumb = matchmakingThumbRef.current; }
    if (id === "verification") { card = verificationRef.current; thumb = verificationThumbRef.current; }
    if (id === "assistance") { card = assistanceRef.current; thumb = assistanceThumbRef.current; }
    if (!card) return;

    const bentoSection = document.getElementById("bento");
    if (bentoSection) {
      isAutoScrollingRef.current = true;
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(bentoSection, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        const offset = bentoSection.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
      setTimeout(() => { isAutoScrollingRef.current = false; }, 1200);
    }

    const state = Flip.getState(card);
    flushSync(() => setActiveCard(id));

    if (overlayContentRef.current) gsap.set(overlayContentRef.current, { autoAlpha: 0, y: 20 });

    if (thumb) {
      gsap.to(thumb, { opacity: 0, duration: 0.4, ease: "power2.out" });
    }

    Flip.from(state, {
      duration: 0.75,
      ease: "power4.out",
      absolute: true,
      zIndex: 50,
      onComplete: () => {
        if (overlayContentRef.current) {
          gsap.to(overlayContentRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" });
        }
      },
    });
  }, []);

  useEffect(() => {
    const onActive = () => { if (activeCardRef.current && !isAutoScrollingRef.current) closeCard(); };
    window.addEventListener("wheel",     onActive, { passive: true });
    window.addEventListener("touchmove", onActive, { passive: true });
    return () => {
      window.removeEventListener("wheel",     onActive);
      window.removeEventListener("touchmove", onActive);
    };
  }, [closeCard]);

  return (
    <section
      id="bento"
      className={`px-4 md:px-[52px] pt-20 md:pt-24 pb-12 md:pb-[80px] min-h-screen md:h-screen flex flex-col font-sans transition-colors duration-500 overflow-visible ${activeCard ? 'bg-white' : 'bg-gray-100'}`}
    >
      <div ref={bentoInnerRef} className="relative flex flex-col md:flex-row gap-3 flex-1 min-h-0 overflow-visible">

        {/* COLONNE 1 */}
        <div id="bento-col-1" className="flex-1 flex flex-col">
          <div
            className="flex-1 rounded-[30px] overflow-hidden relative flex flex-col p-8 min-h-[420px] md:min-h-0"
            style={{ background: `${NOISE}, linear-gradient(180deg, rgba(53,51,49,0.85) 0%, rgba(53,51,49,0) 65%), rgba(153,153,153,0.25)` }}
          >
            <h3 className="text-white font-extrabold uppercase text-[28px] leading-tight shrink-0">
              Tu choisis<br />avec qui tu cours.
            </h3>
            <div className="flex-1 relative mt-4 min-h-[260px] -mb-8">
              <div className="absolute inset-x-0 bottom-0 -top-4 flex items-end justify-center overflow-hidden">
                <AppMockup className="w-[88%] md:w-[min(88%,calc(42vh_-_48px))] translate-y-[22%]" />
              </div>
            </div>
          </div>
        </div>

        {/* COLONNE 2 */}
        <div className="flex-1 flex flex-col gap-3">
          <div
            className="rounded-[30px] overflow-hidden relative flex flex-col p-8 gap-6 min-h-[240px] md:min-h-0"
            style={{ background: `${NOISE}, rgba(153,153,153,0.25)` }}
          >
            <div className="absolute inset-0 pointer-events-none rounded-[30px]"
              style={{ background: "linear-gradient(to bottom, rgba(51,51,51,0.72), rgba(51,51,51,0))" }} />
            <h3 className="relative text-white font-extrabold uppercase text-[22px] leading-tight">
              Matche en<br />quelques secondes.
            </h3>
            <div className="flex flex-col">
              <div className="flex items-end">
                <div className="bg-[#eae3f4] px-7 py-2.5 rounded-t-[22px] relative z-10 after:content-[''] after:absolute after:bottom-0 after:-right-[22px] after:w-[22px] after:h-[22px] after:rounded-bl-[22px] after:shadow-[-10px_10px_0_10px_#eae3f4] after:pointer-events-none">
                  <span className="text-[#7d80f4] font-extrabold text-sm">Autour de vous</span>
                </div>
              </div>
              <div className="bg-[#eae3f4] w-full rounded-b-[22px] rounded-tr-[22px] overflow-hidden flex flex-col relative z-0">
                <div className="divide-y divide-[#d4cce8] flex flex-col">
                  <ProfileRow img={imgArtHur}     name="Art_hur"    distance="350 m"  />
                  <ProfileRow img={imgMaaathilda} name="Maaathilda" distance="1.2 km" />
                  <ProfileRow img={imgQuentin}    name="Quentin"    distance="2.4 km" />
                  <ProfileRow img={imgLaure}      name="Laure"      distance="3.1 km" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 rounded-[30px] overflow-hidden relative flex flex-col p-6 min-h-[320px] md:min-h-0">
            <DraggableMap srcSm={imgMapSm} srcLg={imgMapLg}>
              <img src={imgPin1} alt="" draggable={false} className="absolute top-[41%] left-[35%] w-10 h-10 rounded-full border-2 border-white object-cover shadow-lg transition-transform duration-200 hover:scale-125 hover:shadow-xl hover:border-[#7d80f4] cursor-pointer" />
              <img src={imgPin2} alt="" draggable={false} className="absolute top-[55%] left-[62%] w-10 h-10 rounded-full border-2 border-white object-cover shadow-lg transition-transform duration-200 hover:scale-125 hover:shadow-xl hover:border-[#7d80f4] cursor-pointer" />
            </DraggableMap>
            <div className="absolute inset-0 pointer-events-none z-20" style={{ background: "linear-gradient(to bottom, rgba(53,51,49,0.62), rgba(53,51,49,0))" }} />
            <h3 className="relative z-20 text-white font-extrabold uppercase text-[28px] leading-tight pointer-events-none">
              Vois qui court<br />en ce moment.
            </h3>
          </div>
        </div>

        {/* COLONNE 3 */}
        <div id="bento-col-3" className="flex-1 flex flex-col gap-3">
          
          {/* Matchmaking */}
          <div className={`flex-[0.9] min-h-[140px] md:min-h-0 ${activeCard === "matchmaking" ? "" : "relative"}`}>
            <div
              ref={matchmakingRef}
              onClick={() => openCard("matchmaking")}
              className={
                activeCard === "matchmaking"
                  ? "absolute inset-0 z-50 overflow-hidden rounded-[30px] bg-white"
                  : "absolute inset-0 group rounded-[30px] overflow-hidden flex items-center p-6 cursor-pointer"
              }
              style={{ 
                background: activeCard === "matchmaking" ? "#FFFFFF" : "rgba(153,153,153,0.25)",
                boxShadow: activeCard === "matchmaking" ? "0 0 0 2px white" : "none"
              }}
            >
              <div ref={matchmakingThumbRef} className="flex items-center gap-5 w-full" style={{ opacity: activeCard === "matchmaking" ? 0 : 1 }}>
                <img src={imgHandshake} alt="" className="w-16 h-16 shrink-0 opacity-70 transition-transform group-hover:scale-110" />
                <h3 className="text-white font-medium text-[22px] leading-tight">Matchmaking<br />instantané</h3>
              </div>
              
              {activeCard === "matchmaking" && (
                <div ref={overlayContentRef} className="relative z-10 h-full flex flex-col p-6 md:px-10 md:py-12 w-full max-w-6xl mx-auto overflow-y-auto">
                  <button onClick={(e) => { e.stopPropagation(); closeCard(); }} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[#201a41] hover:bg-[#201a41] hover:text-white transition-all z-20">
                    <FiX size={24} />
                  </button>
                  <div className="mb-10 pr-12">
                    <h2 className="text-[#201a41] text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-tight">VOTRE RYTHME,<br /><span className="text-[#7d80f4]">VOTRE MATCH.</span></h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#7d80f4]/10 flex items-center justify-center"><FiZap size={24} className="text-[#7d80f4]" /></div>
                      <h3 className="text-[#201a41] text-xl font-extrabold uppercase tracking-tight">Vitesse Éclair.</h3>
                      <p className="text-[#201a41]/60 leading-relaxed font-medium">Trouvez un partenaire en moins de 30 secondes grâce à notre algorithme optimisé.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#201a41]/5 flex items-center justify-center"><FiUsers size={24} className="#201a41" /></div>
                      <h3 className="text-[#201a41] text-xl font-extrabold uppercase tracking-tight">Affinités.</h3>
                      <p className="text-[#201a41]/60 leading-relaxed font-medium">On ne matche pas que le chrono, mais aussi vos objectifs et votre philosophie de course.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#7d80f4]/10 flex items-center justify-center"><FiCheckCircle size={24} className="text-[#7d80f4]" /></div>
                      <h3 className="text-[#201a41] text-xl font-extrabold uppercase tracking-tight">Fiabilité.</h3>
                      <p className="text-[#201a41]/60 leading-relaxed font-medium">98% de satisfaction sur les rencontres Unify. Courez avec l'esprit tranquille.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Vérification */}
          <div className={`flex-1 min-h-[160px] md:min-h-0 ${activeCard === "verification" ? "" : "relative"}`}>
            <div
              ref={verificationRef}
              onClick={() => openCard("verification")}
              className={
                activeCard === "verification"
                  ? "absolute inset-0 z-50 overflow-hidden rounded-[30px] bg-white"
                  : "absolute inset-0 group rounded-[30px] overflow-hidden flex items-center p-6 cursor-pointer"
              }
              style={{ 
                background: activeCard === "verification" ? "#FFFFFF" : "rgba(153,153,153,0.25)",
                boxShadow: activeCard === "verification" ? "0 0 0 2px white" : "none"
              }}
            >
              <div ref={verificationThumbRef} className="flex items-center justify-between w-full" style={{ opacity: activeCard === "verification" ? 0 : 1 }}>
                <h3 className="text-white font-medium text-[22px] leading-tight">Vérification<br />d'identité</h3>
                <img src={imgShield} alt="" className="w-20 h-20 shrink-0 opacity-70 transition-transform group-hover:scale-110" />
              </div>
              
              {activeCard === "verification" && (
                <div ref={overlayContentRef} className="relative z-10 h-full flex flex-col p-6 md:px-10 md:py-12 w-full max-w-6xl mx-auto overflow-y-auto">
                  <button onClick={(e) => { e.stopPropagation(); closeCard(); }} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[#201a41] hover:bg-[#201a41] hover:text-white transition-all z-20">
                    <FiX size={24} />
                  </button>
                  <div className="mb-10 pr-12">
                    <h2 className="text-[#201a41] text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-tight">CONFIANCE<br /><span className="text-[#7d80f4]">CERTIFIÉE.</span></h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#7d80f4]/10 flex items-center justify-center"><FiShield size={24} className="text-[#7d80f4]" /></div>
                      <h3 className="text-[#201a41] text-xl font-extrabold uppercase tracking-tight">Profils Réels.</h3>
                      <p className="text-[#201a41]/60 leading-relaxed font-medium">Chaque membre passe par un processus de vérification strict pour garantir une communauté saine.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#201a41]/5 flex items-center justify-center"><FiCheckCircle size={24} className="#201a41" /></div>
                      <h3 className="text-[#201a41] text-xl font-extrabold uppercase tracking-tight">Badge Unify.</h3>
                      <p className="text-[#201a41]/60 leading-relaxed font-medium">Le badge bleu certifie que vous courez avec un profil authentifié et respectueux des règles.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#7d80f4]/10 flex items-center justify-center"><FiAlertTriangle size={24} className="text-[#7d80f4]" /></div>
                      <h3 className="text-[#201a41] text-xl font-extrabold uppercase tracking-tight">Modération.</h3>
                      <p className="text-[#201a41]/60 leading-relaxed font-medium">Une équipe dédiée surveille les signalements 24/7 pour maintenir l'intégrité de la plateforme.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Assistance */}
          <div className={`flex-[1.1] min-h-[180px] md:min-h-0 ${activeCard === "assistance" ? "" : "relative"}`}>
            <div
              ref={assistanceRef}
              onClick={() => openCard("assistance")}
              className={
                activeCard === "assistance"
                  ? "absolute inset-0 z-50 overflow-hidden rounded-[30px] bg-white"
                  : "absolute inset-0 group rounded-[30px] overflow-hidden flex items-end p-6 cursor-pointer bg-white"
              }
              style={{ 
                boxShadow: activeCard === "assistance" ? "0 0 0 2px white" : "none"
              }}
            >
              <div ref={assistanceThumbRef} className="absolute inset-0" style={{ opacity: activeCard === "assistance" ? 0 : 1 }}>
                <picture className="absolute inset-0 w-full h-full">
                  <source srcSet={imgAssistanceLg} media="(min-width: 768px)" />
                  <img src={imgAssistanceSm} alt="Assistance" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:from-black/75" />
                <div className="relative z-10 flex items-center justify-between w-full h-full p-6">
                  <h3 className="text-white font-medium text-[22px]">Assistance</h3>
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110">
                    <FiSearch size={16} strokeWidth={2.5} />
                  </span>
                </div>
              </div>

              {activeCard === "assistance" && (
                <div ref={overlayContentRef} className="relative z-10 h-full flex flex-col p-6 md:px-10 md:py-12 w-full max-w-6xl mx-auto overflow-y-auto">
                  <button onClick={(e) => { e.stopPropagation(); closeCard(); }} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#f3f4f6] flex items-center justify-center text-[#201a41] hover:bg-[#201a41] hover:text-white transition-all z-20">
                    <FiX size={24} />
                  </button>
                  <div className="mb-10 pr-12"><h2 className="text-[#201a41] text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-tight">VOTRE ANGE<br /><span className="text-[#7d80f4]">GARDIEN.</span></h2></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 flex-1">
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#7d80f4]/10 flex items-center justify-center"><FiPhone size={24} className="text-[#7d80f4]" /></div>
                      <h3 className="text-[#201a41] text-xl font-extrabold uppercase tracking-tight">Urgence SOS 24/7.</h3>
                      <p className="text-[#201a41]/60 leading-relaxed font-medium text-sm md:text-base">Un problème ? Un bouton dédié alerte instantanément nos équipes et vos contacts d'urgence.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#201a41]/5 flex items-center justify-center"><FiAlertTriangle size={24} className="#201a41" /></div>
                      <h3 className="text-[#201a41] text-xl font-extrabold uppercase tracking-tight">Signalement Direct.</h3>
                      <p className="text-[#201a41]/60 leading-relaxed font-medium text-sm md:text-base">Signalez tout incident ou comportement inapproprié sur votre parcours.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#7d80f4]/10 flex items-center justify-center"><FiMessageCircle size={24} className="text-[#7d80f4]" /></div>
                      <h3 className="text-[#201a41] text-xl font-extrabold uppercase tracking-tight">Support Humain.</h3>
                      <p className="text-[#201a41]/60 leading-relaxed font-medium text-sm md:text-base">Zéro bots. Chattez avec notre équipe pour toute question, à chaque kilomètre.</p>
                    </div>
                  </div>
                  <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {[imgArtHur, imgMaaathilda, imgQuentin, imgLaure].map((img, i) => (
                          <img key={i} src={img} alt="" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" />
                        ))}
                      </div>
                      <p className="text-[#201a41] font-bold text-sm md:text-base">REJOIGNEZ <span className="text-[#7d80f4]">12,000+</span> COUREURS.</p>
                    </div>
                    <button className="w-full md:w-auto px-8 py-4 bg-[#7d80f4] text-white rounded-2xl font-extrabold uppercase tracking-widest text-xs hover:bg-[#6b6fe8] transition-all">CONSULTER LA FAQ</button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BentoGrid;