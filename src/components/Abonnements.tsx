import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const freemiumFeatures = [
  "Matching instantané",
  "Modes de connexion (F/H/Mixte)",
  "Rencontres limitées (2 par mois)",
  "Partage de position",
  "Vérification d'identité (basique)",
  "Assistance",
];

const premiumFeatures: { label: string; highlight?: string }[] = [
  { label: "Matching instantané" },
  { label: "Modes de connexion (F/H/Mixte)" },
  { label: "Rencontres illimitées", highlight: "illimitées" },
  { label: "Partage de position" },
  {
    label: "Vérification d'identité avancée badge exclusif",
    highlight: "badge exclusif",
  },
  { label: "Assistance" },
  { label: "Statistiques avancées" },
  { label: "Coaching" },
  { label: "Accès aux évènements" },
  { label: "Accès aux groupes privés" },
];

const PIN_SCROLL_DISTANCE = 800;

const Abonnements: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gratuitRef = useRef<HTMLDivElement>(null);
  const premiumRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const gratuit = gratuitRef.current;
    const premium = premiumRef.current;
    if (!section || !gratuit || !premium) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set(gratuit, { y: 380, rotation: 0, willChange: "transform" });
      gsap.set(premium, { y: 520, rotation: 0, willChange: "transform" });

      requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));

      const ro = new ResizeObserver(() => ScrollTrigger.refresh());
      ro.observe(document.body);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${PIN_SCROLL_DISTANCE}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(gratuit, { y: 0, rotation: -1, duration: 1, ease: "power2.out" }, 0);
      tl.to(premium, { y: 0, rotation: 1.5, duration: 1, ease: "power2.out" }, 0);

      return () => {
        ro.disconnect();
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(gratuit, { clearProps: "all" });
        gsap.set(premium, { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="abonnements"
      ref={sectionRef}
      className="relative z-0 min-h-screen md:h-screen flex flex-col justify-center overflow-visible px-5 sm:px-8 py-10 md:py-16"
    >
      <div className="max-w-5xl mx-auto w-full overflow-visible min-h-0">
        {/* ── Heading ── */}
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-white">
            Rejoins le mouvement
          </h2>
          <p className="mt-1.5 md:mt-3 text-white/70 text-xs md:text-lg">
            Gratuit pour commencer, Premium pour aller plus loin.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3 md:gap-8 max-w-4xl mx-auto w-full md:pb-[300px] overflow-visible">
          {/* GRATUIT */}
          <div ref={gratuitRef} className="overflow-visible">
            <div className="bg-[#7D80F4] border border-white/[0.08] rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col h-full">
              <h3 className="text-base md:text-3xl font-bold text-white mb-2 md:mb-4">
                Gratuit
              </h3>
              <div className="h-px bg-white/[0.06] mb-2 md:mb-4" />
              <ul className="space-y-1 md:space-y-2.5 mb-3 md:mb-0">
                {freemiumFeatures.map((f, i) => (
                  <li
                    key={i}
                    className="text-[11px] md:text-[15px] text-white leading-snug pl-3 md:pl-4 relative before:absolute before:left-0 before:top-[6px] md:before:top-[9px] before:w-1.5 before:h-px before:bg-white/40"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <div className="hidden min-[400px]:block space-y-2 mt-2 mb-4 select-none" aria-hidden>
                {[
                  "Accès aux groupes privés",
                  "Statistiques avancées",
                  "Coaching",
                  "Accès aux évènements",
                ].map((f, i) => (
                  <p key={i} className="text-[15px] text-white/60 leading-relaxed pl-4 blur-[5px]">
                    {f}
                  </p>
                ))}
              </div>
              <button className="w-full py-2 md:py-3 rounded-xl md:rounded-2xl text-[11px] md:text-[14px] font-semibold text-white bg-transparent border border-white/20 hover:border-white/40 transition-all duration-300 mt-auto">
                Commencer gratuitement
              </button>
            </div>
          </div>

          {/* PREMIUM */}
          <div ref={premiumRef} className="overflow-visible">
            <div className="bg-[#201A41] border border-white/[0.08] rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col h-full">
              <div className="flex items-baseline justify-between mb-2 md:mb-4">
                <h3 className="text-base md:text-3xl font-bold text-[#7D80F4]">
                  Premium
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl md:text-5xl font-bold tracking-tight text-white">
                    4,99€
                  </span>
                  <span className="text-[10px] md:text-xs font-semibold text-white/60">
                    /mois
                  </span>
                </div>
              </div>
              <div className="h-px bg-white/[0.06] mb-2 md:mb-4" />
              <ul className="space-y-1 md:space-y-2.5 mb-3 md:mb-6">
                {premiumFeatures.map((f, i) => (
                  <li
                    key={i}
                    className="text-[11px] md:text-[15px] text-white leading-snug pl-3 md:pl-4 relative before:absolute before:left-0 before:top-[6px] md:before:top-[9px] before:w-1.5 before:h-px before:bg-primary-500/60"
                  >
                    {f.highlight ? (
                      <>
                        {f.label.replace(f.highlight, "")}
                        <span className="inline-block text-white bg-[#7D80F4] px-1.5 py-0.5 rounded-lg text-[11px] md:text-[13px] shadow-[0_8px_24px_rgba(125,128,244,0.35)]">
                          {f.highlight}
                        </span>
                      </>
                    ) : (
                      f.label
                    )}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 md:py-3 rounded-xl md:rounded-2xl text-[11px] md:text-[14px] font-semibold text-[#353331] bg-[#D5CFFB] hover:bg-[#D5CFFB]/85 transition-colors duration-300 mt-auto">
                Passer Premium
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Abonnements;
