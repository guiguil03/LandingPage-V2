import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../data/avis.json";
import type { Avis } from "../type/avis";
import Logo from "../assets/logo.png";

gsap.registerPlugin(ScrollTrigger);

interface AvisGridProps {
  avis?: Avis[];
}

const AvisComponent: React.FC<AvisGridProps> = ({ avis: externalAvis }) => {
  const [avisData] = useState(externalAvis || data.avis);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackAreaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const totalCards = cards.length;

    // Set initial state: all cards invisible and below the viewport
    cards.forEach((card) => {
      gsap.set(card, {
        yPercent: 150,
        opacity: 0,
        scale: 0.92,
      });
    });

    // Create master timeline pinned to the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        // Each card gets ~500px of scroll distance + a little buffer at end
        end: `+=${totalCards * 500 + 200}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    // Animate each card in sequence
    cards.forEach((card, i) => {
      // Alternating rotation: first card tilts left, second tilts right, etc.
      const rotation = i % 2 === 0 ? -2.5 : 2.5;
      // Small vertical offset for each stacked card to create depth
      const stackOffsetY = -i * 6;

      tl.to(
        card,
        {
          yPercent: 0,
          y: stackOffsetY,
          opacity: 1,
          rotation: rotation,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        i * 1.1 // stagger start time within the timeline
      );

      // When a new card arrives, slightly push down the previous ones for "settling"
      if (i > 0) {
        tl.to(
          cards[i - 1],
          {
            scale: 0.97,
            duration: 0.3,
          },
          i * 1.1 // same time as the new card starts
        );
      }
    });

    // Small hold at the end so the user sees the full stack before unpin
    tl.to({}, { duration: 0.5 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [avisData]);

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full bg-gray-100 overflow-hidden flex flex-col"
    >
      {/* Title */}
      <div className="pt-10 sm:pt-14 pb-4 sm:pb-6 flex flex-col items-center px-4 flex-shrink-0">
        <div className="w-full max-w-3xl p-4 sm:p-6 bg-white rounded-2xl shadow-md flex flex-col items-center">
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Logo Unify"
              className="h-10 w-10 md:h-12 md:w-12 object-contain"
            />
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-center">
              Vous avez adopté la course avec{" "}
              <span className="text-primary-500 font-bold text-2xl sm:text-4xl md:text-5xl">
                Unify
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Stacking area — flex centers the wrapper; cards are absolute inside */}
      <div
        ref={stackAreaRef}
        className="flex-1 relative flex items-center justify-center px-4"
      >
        <div className="relative w-full max-w-[600px] h-[180px] sm:h-[160px]">
          {avisData.map((avis, index) => (
            <div
              key={avis.id ?? index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="absolute inset-x-0 top-0 w-full bg-[#1E1E1E] text-white p-4 sm:p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4"
              style={{
                zIndex: index + 1,
                willChange: "transform, opacity",
              }}
            >
              <div className="flex-shrink-0">
                <img
                  className="w-16 h-16 sm:w-12 sm:h-12 object-cover rounded-full border-2 border-primary-500 shadow-md"
                  src={avis.image}
                  alt={avis.nom}
                />
              </div>
              <div className="flex flex-col text-center sm:text-left">
                <p className="font-bold text-lg sm:text-base md:text-lg">
                  {avis.prenom} {avis.nom}
                </p>
                <p className="text-sm text-gray-300 mt-2 sm:mt-1 line-clamp-6 sm:line-clamp-none">
                  &ldquo;{avis.commentaire}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvisComponent;
