import React, { useState, useRef, useCallback, useEffect } from "react";
import { flushSync } from "react-dom";
import { FiSearch, FiX, FiMessageCircle, FiAlertTriangle, FiPhone, FiHelpCircle } from "react-icons/fi";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
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

const ASSISTANCE_ITEMS = [
  { icon: FiMessageCircle, title: "Support",     desc: "Chat en direct avec l'équipe Unify" },
  { icon: FiAlertTriangle, title: "Signaler",    desc: "Incident ou comportement lors d'un run" },
  { icon: FiPhone,         title: "Urgence SOS", desc: "Numéro d'urgence disponible 24h/24" },
  { icon: FiHelpCircle,   title: "FAQ",          desc: "Réponses aux questions fréquentes" },
];

const AUTO_CLOSE_MS = 60_000;

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

const BentoGrid: React.FC = () => {
  const bentoInnerRef     = useRef<HTMLDivElement>(null);     // conteneur position:relative
  const col3Ref           = useRef<HTMLDivElement>(null);     // verrouillage layout
  const assistanceCardRef = useRef<HTMLDivElement>(null);
  const placeholderRef    = useRef<HTMLDivElement>(null);
  const overlayContentRef = useRef<HTMLDivElement>(null);
  const isOpenRef  = useRef(false);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef= useRef<ReturnType<typeof setInterval> | null>(null);
  const [isOpen, setIsOpen]     = useState(false);
  const [countdown, setCountdown] = useState(60);

  const unlockCol3 = useCallback(() => {
    if (col3Ref.current) gsap.set(col3Ref.current, { clearProps: "height" });
  }, []);

  const lockCol3 = useCallback(() => {
    const col3 = col3Ref.current;
    if (!col3) return;
    // Figer la hauteur en pixels → Matchmaking & Vérification ne bougent plus
    gsap.set(col3, { height: col3.getBoundingClientRect().height });
  }, []);

  const closeAssistance = useCallback(() => {
    if (!isOpenRef.current) return;
    isOpenRef.current = false;

    if (timerRef.current)    { clearTimeout(timerRef.current);    timerRef.current   = null; }
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }

    const card    = assistanceCardRef.current;
    const content = overlayContentRef.current;
    if (!card) return;

    const doClose = () => {
      const placeholder = placeholderRef.current;
      const bentoInner  = bentoInnerRef.current;

      lockCol3();

      if (!placeholder || !bentoInner) {
        // fallback sans animation
        flushSync(() => setIsOpen(false));
        unlockCol3();
        return;
      }

      const phRect    = placeholder.getBoundingClientRect();
      const bentoRect = bentoInner.getBoundingClientRect();

      // Convertir inset-0 (CSS) en px explicites — même rendu visuel
      gsap.set(card, {
        position: "absolute",
        top:    0,
        left:   0,
        right:  "auto",
        bottom: "auto",
        width:  bentoRect.width,
        height: bentoRect.height,
      });

      // Animer vers la position exacte du placeholder
      gsap.to(card, {
        top:      phRect.top  - bentoRect.top,
        left:     phRect.left - bentoRect.left,
        width:    phRect.width,
        height:   phRect.height,
        duration: 0.65,
        ease:     "power4.inOut",
        onComplete: () => {
          flushSync(() => setIsOpen(false));
          gsap.set(card, { clearProps: "all" });
          unlockCol3();
        },
      });
    };

    if (content) {
      gsap.to(content, { autoAlpha: 0, y: 10, duration: 0.18, ease: "power2.in", onComplete: doClose });
    } else {
      doClose();
    }
  }, [lockCol3, unlockCol3]);

  const openAssistance = useCallback(() => {
    if (isOpenRef.current) return;
    isOpenRef.current = true;
    setCountdown(60);

    const card = assistanceCardRef.current;
    if (!card) return;

    lockCol3(); // fige avant le Flip
    const state = Flip.getState(card);
    flushSync(() => setIsOpen(true));

    if (overlayContentRef.current) gsap.set(overlayContentRef.current, { autoAlpha: 0, y: 20 });

    Flip.from(state, {
      duration: 0.72,
      ease: "power4.out",
      onComplete: () => {
        unlockCol3();
        if (overlayContentRef.current) {
          gsap.to(overlayContentRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" });
        }
      },
    });

    timerRef.current    = setTimeout(closeAssistance, AUTO_CLOSE_MS);
    intervalRef.current = setInterval(() => setCountdown((p) => Math.max(0, p - 1)), 1000);
  }, [lockCol3, unlockCol3, closeAssistance]);

  // Fermeture sur scroll actif (pas l'inertie Lenis)
  useEffect(() => {
    const onActive = () => { if (isOpenRef.current) closeAssistance(); };
    window.addEventListener("wheel",     onActive, { passive: true });
    window.addEventListener("touchmove", onActive, { passive: true });
    return () => {
      window.removeEventListener("wheel",     onActive);
      window.removeEventListener("touchmove", onActive);
      if (timerRef.current)    clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [closeAssistance]);

  return (
    <section id="bento" className="bg-gray-100 px-4 md:px-[52px] py-12 min-h-screen md:h-screen flex flex-col">
      <div ref={bentoInnerRef} className="relative flex flex-col md:flex-row gap-3 flex-1 min-h-0">

        {/* COLONNE 1 */}
        <div className="flex-1 flex flex-col">
          <div
            className="flex-1 rounded-[30px] overflow-hidden relative flex flex-col p-8 min-h-[420px] md:min-h-0"
            style={{ background: "linear-gradient(180deg, rgba(53,51,49,0.85) 0%, rgba(0,0,0,0) 60%), rgba(153,153,153,0.25)" }}
          >
            <h3 className="text-white font-black uppercase text-[28px] leading-tight shrink-0">
              Tu choisis<br />avec qui tu cours.
            </h3>
            <div className="flex-1 relative mt-4 min-h-[260px] -mb-8">
              <div className="absolute inset-x-0 bottom-0 -top-4 flex items-end justify-center overflow-hidden">
                <AppMockup className="w-[88%] translate-y-[22%]" />
              </div>
            </div>
          </div>
        </div>

        {/* COLONNE 2 */}
        <div className="flex-1 flex flex-col gap-3">
          <div
            className="rounded-[30px] overflow-hidden relative flex flex-col p-8 gap-6 min-h-[240px] md:min-h-0"
            style={{ background: "linear-gradient(180deg, rgba(51,51,51,0.7) 0%, rgba(51,51,51,0) 100%), rgba(153,153,153,0.25)" }}
          >
            <h3 className="text-white font-black uppercase text-[22px] leading-tight">
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
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(53,51,49,0.7)] via-transparent to-transparent pointer-events-none z-20" />
            <h3 className="relative z-20 text-white font-black uppercase text-[28px] leading-tight pointer-events-none">
              Vois qui court<br />en ce moment.
            </h3>
          </div>
        </div>

        {/* COLONNE 3 — hauteur verrouillée pendant les animations */}
        <div ref={col3Ref} className="flex-1 flex flex-col gap-3">
          <div
            className="flex-[0.9] rounded-[30px] overflow-hidden relative flex items-center gap-5 p-6 min-h-[140px] md:min-h-0"
            style={{ background: "rgba(153,153,153,0.25)" }}
          >
            <img src={imgHandshake} alt="" className="w-16 h-16 shrink-0 opacity-70" />
            <h3 className="text-white font-medium text-[22px] leading-tight">Matchmaking<br />instantané</h3>
          </div>

          <div
            className="flex-1 rounded-[30px] overflow-hidden relative flex items-center justify-between p-6 min-h-[160px] md:min-h-0"
            style={{ background: "rgba(153,153,153,0.25)" }}
          >
            <h3 className="text-white font-medium text-[22px] leading-tight">Vérification<br />d'identité</h3>
            <img src={imgShield} alt="" className="w-20 h-20 shrink-0 opacity-70" />
          </div>

          {/* Placeholder invisible — maintient la place quand la carte est en absolute */}
          {isOpen && (
            <div ref={placeholderRef} className="flex-[1.1] min-h-[180px] md:min-h-0 invisible" />
          )}

          {/* ── Carte Assistance — vrai morph GSAP Flip ── */}
          <div
            ref={assistanceCardRef}
            onClick={!isOpen ? openAssistance : undefined}
            className={
              isOpen
                ? "absolute inset-0 z-50 overflow-hidden rounded-[30px]"
                : "group flex-[1.1] rounded-[30px] overflow-hidden relative flex items-end p-6 min-h-[180px] md:min-h-0 cursor-pointer"
            }
            style={{ background: isOpen ? "#EAE3F4" : undefined }}
          >
            {/* Face fermée */}
            {!isOpen && (
              <>
                <picture className="absolute inset-0 w-full h-full transition-[transform,filter] duration-500 group-hover:scale-105 group-hover:blur-sm">
                  <source srcSet={imgAssistanceLg} media="(min-width: 768px)" />
                  <img src={imgAssistanceSm} alt="Assistance" className="w-full h-full object-cover" />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:from-black/75" />
                <div className="relative z-10 flex items-center justify-between w-full">
                  <h3 className="text-white font-medium text-[22px]">Assistance</h3>
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110 group-hover:shadow-lg">
                    <FiSearch size={16} strokeWidth={2.5} />
                  </span>
                </div>
              </>
            )}

            {/* Face ouverte */}
            {isOpen && (
              <div ref={overlayContentRef} className="relative z-10 h-full flex flex-col p-7 md:p-10">
                <div className="flex items-start justify-between mb-7">
                  <div>
                    <span className="text-[#7d80f4] text-[10px] uppercase tracking-[0.2em] font-semibold">Unify</span>
                    <h2 className="text-[#201a41] text-3xl md:text-4xl font-black mt-0.5">Assistance</h2>
                    <p className="text-[#201a41]/50 text-sm mt-1">Comment pouvons-nous vous aider ?</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); closeAssistance(); }}
                    className="w-10 h-10 rounded-full bg-[#7d80f4]/10 border border-[#7d80f4]/20 flex items-center justify-center text-[#7d80f4] hover:bg-[#7d80f4] hover:text-white transition-all duration-200 shrink-0"
                    aria-label="Fermer"
                  >
                    <FiX size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
                  {ASSISTANCE_ITEMS.map(({ icon: Icon, title, desc }) => (
                    <button
                      key={title}
                      className="bg-white border border-[#7d80f4]/15 rounded-2xl p-4 md:p-5 flex flex-col items-start gap-2 hover:border-[#7d80f4]/40 hover:shadow-sm active:scale-[0.97] transition-all duration-200 text-left"
                    >
                      <span className="w-9 h-9 rounded-xl bg-[#7d80f4]/10 flex items-center justify-center">
                        <Icon size={18} className="text-[#7d80f4]" />
                      </span>
                      <span className="text-[#201a41] font-bold text-sm md:text-base leading-tight">{title}</span>
                      <span className="text-[#201a41]/50 text-xs leading-snug">{desc}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-5 select-none">
                  <div className="w-full h-[2px] bg-[#7d80f4]/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#7d80f4] rounded-full transition-[width] duration-1000 ease-linear"
                      style={{ width: `${(countdown / 60) * 100}%` }}
                    />
                  </div>
                  <p className="text-[#201a41]/30 text-[11px] text-center mt-2">
                    Fermeture automatique dans {countdown}s
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default BentoGrid;
