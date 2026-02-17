import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../data/avis.json";
import type { Avis } from "../type/avis";

gsap.registerPlugin(ScrollTrigger);

interface AvisGridProps {
  avis?: Avis[];
}

/* ── Shared title ── */
const SectionTitle = () => (
  <div className="pt-10 sm:pt-16 pb-4 sm:pb-6 flex flex-col items-center px-4 flex-shrink-0">
    <div className="w-full max-w-[560px] flex flex-col items-center text-center">
      <span className="font-bold text-3xl sm:text-[50px] sm:leading-[65px] tracking-tight text-[#353331]">
        Ils ont adopté
      </span>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="font-bold text-3xl sm:text-[52px] sm:leading-[65px] tracking-tight text-[#353331]">
          la course avec
        </span>
        <span
          className="font-bold text-3xl sm:text-[50px] sm:leading-[59px] tracking-tight text-white bg-[#7D80F4] px-3 py-0.5 rounded-xl shadow-[0_8px_24px_rgba(125,128,244,0.35)]"
        >
          UNIFY
        </span>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════
   MOBILE — SWIPEABLE CARD STACK + AVATAR NAV
   ═══════════════════════════════════════════════════ */
const CYCLE_MS = 5000;

const MobileStack: React.FC<{ items: Avis[] }> = ({ items }) => {
  const [, forceRender] = useState(0);
  const orderRef = useRef(items.map((_, i) => i));
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartX = useRef(0);
  const isAnimating = useRef(false);
  const autoRef = useRef<ReturnType<typeof setInterval>>();

  const getRotation = (stackPos: number) => {
    if (stackPos === 0) return 0;
    return stackPos % 2 === 0 ? -2.5 : 2.5;
  };

  const layoutStack = useCallback(() => {
    const order = orderRef.current;
    order.forEach((cardIdx, stackPos) => {
      const card = cardsRef.current[cardIdx];
      if (!card) return;
      gsap.set(card, {
        zIndex: items.length - stackPos,
        x: 0,
        y: stackPos * 8,
        scale: 1 - stackPos * 0.04,
        rotation: getRotation(stackPos),
        opacity: stackPos < 3 ? 1 : 0,
        pointerEvents: stackPos === 0 ? "auto" : "none",
      });
    });
  }, [items.length]);

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      dismissTopRef.current();
    }, CYCLE_MS);
  }, []);

  const resetAuto = useCallback(() => {
    startAuto();
  }, [startAuto]);

  // Use a ref for dismissTop so the interval always calls the latest version
  const dismissTopRef = useRef(() => {});

  // Alternating exit side
  const exitSideRef = useRef(1);

  // Core animation: dismiss top card and settle stack
  const flyOff = useCallback(
    (nextOrder: number[]) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const order = orderRef.current;
      const topIdx = order[0];
      const topCard = cardsRef.current[topIdx];
      if (!topCard) return;

      // Alternating direction
      const side = exitSideRef.current;
      exitSideRef.current = side * -1;
      const exitX = side * (200 + Math.random() * 60);
      const exitRotation = side * (15 + Math.random() * 8);

      // Update order + avatar immediately so UI is in sync
      orderRef.current = nextOrder;
      forceRender((n) => n + 1);

      const tl = gsap.timeline({
        onComplete: () => {
          // Park dismissed card at back
          gsap.set(topCard, {
            x: 0,
            y: nextOrder.length * 8,
            rotation: getRotation(nextOrder.length - 1),
            scale: 1 - (nextOrder.length - 1) * 0.04,
            opacity: 0,
            zIndex: 1,
          });
          isAnimating.current = false;
        },
      });

      // Top card flies off
      tl.to(topCard, {
        x: exitX,
        rotation: exitRotation,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      });

      // Remaining cards settle into new positions
      nextOrder.forEach((cardIdx, stackPos) => {
        const card = cardsRef.current[cardIdx];
        if (!card || cardIdx === topIdx) return;
        tl.to(
          card,
          {
            zIndex: items.length - stackPos,
            y: stackPos * 8,
            scale: 1 - stackPos * 0.04,
            rotation: getRotation(stackPos),
            opacity: stackPos < 3 ? 1 : 0,
            pointerEvents: stackPos === 0 ? "auto" : "none",
            duration: 0.35,
            ease: "power2.out",
          },
          0.15,
        );
      });
    },
    [items.length],
  );

  // Dismiss top card (swipe / tap / auto)
  const dismissTop = useCallback(() => {
    const order = orderRef.current;
    const newOrder = [...order.slice(1), order[0]];
    flyOff(newOrder);
  }, [flyOff]);

  // Keep ref in sync for auto interval
  useEffect(() => {
    dismissTopRef.current = dismissTop;
  }, [dismissTop]);

  // Navigate to a specific card by avatar tap
  const goToCard = useCallback(
    (targetIdx: number) => {
      const order = orderRef.current;
      if (order[0] === targetIdx) return;
      const newOrder = [targetIdx, ...order.filter((i) => i !== targetIdx)];
      flyOff(newOrder);
      resetAuto();
    },
    [flyOff, resetAuto],
  );

  // Init
  useEffect(() => {
    orderRef.current = items.map((_, i) => i);
    layoutStack();
    startAuto();
    return () => clearInterval(autoRef.current);
  }, [items, layoutStack, startAuto]);

  // Swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      dismissTop();
      resetAuto();
    }
  };

  const topIdx = orderRef.current[0];

  return (
    <div className="flex flex-col items-center px-5 pb-10 flex-1 justify-center">
      {/* Stack */}
      <div
        className="relative w-full max-w-[360px] h-[300px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => {
          if (!isAnimating.current) {
            dismissTop();
            resetAuto();
          }
        }}
      >
        {items.map((avis, i) => (
          <div
            key={avis.id ?? i}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="absolute inset-x-0 top-0 w-full bg-[#353331] border border-[#2E2E2E] rounded-[32px] px-6 py-7 flex flex-col justify-between"
            style={{ willChange: "transform, opacity", height: "280px" }}
          >
            <p className="text-white text-[15px] leading-[24px]">
              &ldquo;{avis.commentaire}&rdquo;
            </p>
            <span className="text-[#FBFBFB] text-[14px] font-medium mt-3">
              {avis.prenom} {avis.nom}
            </span>
          </div>
        ))}
      </div>

      {/* Avatar nav */}
      <div className="flex items-center gap-4 mt-6">
        {items.map((item, i) => (
          <button
            key={item.id ?? i}
            onClick={(e) => {
              e.stopPropagation();
              goToCard(i);
            }}
            className="relative rounded-full outline-none"
          >
            <img
              src={item.image}
              alt={item.nom}
              className={`rounded-full object-cover border-2 ${
                i === topIdx
                  ? "w-[52px] h-[52px] border-primary-500 opacity-100"
                  : "w-10 h-10 border-transparent opacity-30 grayscale"
              }`}
              style={{
                transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   DESKTOP GSAP STACKING
   ═══════════════════════════════════════════ */
const DesktopStack: React.FC<{ items: Avis[] }> = ({ items }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const totalCards = cards.length;

    cards.forEach((card) => {
      gsap.set(card, { yPercent: 150, opacity: 1, scale: 0.92 });
    });

    const refreshOnReady = () => ScrollTrigger.refresh();
    const imgLoadPromises = Array.from(document.images)
      .filter((img) => !img.complete)
      .map(
        (img) =>
          new Promise((r) => {
            img.onload = r;
            img.onerror = r;
          }),
      );
    if (imgLoadPromises.length) {
      Promise.all(imgLoadPromises).then(refreshOnReady);
    } else {
      requestAnimationFrame(() => requestAnimationFrame(refreshOnReady));
    }

    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(document.body);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalCards * 500 + 200}`,
        pin: true,
        scrub: 1,
        pinSpacing: true,
        invalidateOnRefresh: true,
      },
    });

    cards.forEach((card, i) => {
      const rotation = i % 2 === 0 ? -2.5 : 2.5;
      const stackOffsetY = -i * 6;

      tl.to(
        card,
        {
          yPercent: 0,
          y: stackOffsetY,
          rotation: rotation,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        i * 1.1,
      );

      if (i > 0) {
        tl.to(cards[i - 1], { scale: 0.97, duration: 0.3 }, i * 1.1);
      }
    });

    tl.to({}, { duration: 0.5 });

    return () => {
      ro.disconnect();
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [items]);

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex flex-col"
    >
      <SectionTitle />

      <div className="flex-1 relative flex items-center justify-center px-4">
        <div className="relative w-full max-w-[775px] h-[260px]">
          {items.map((avis, index) => (
            <div
              key={avis.id ?? index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="absolute inset-x-0 top-0 w-full max-w-[775px] bg-[#353331] border border-[#2E2E2E] rounded-[40px] flex flex-col justify-end items-center px-12 py-12"
              style={{ zIndex: index + 1, willChange: "transform, opacity" }}
            >
              <div className="w-full flex flex-row items-center gap-2.5 mb-5">
                <img
                  className="w-[77px] h-[77px] object-cover rounded-full flex-shrink-0"
                  src={avis.image}
                  alt={avis.nom}
                />
                <p className="font-normal text-[23px] leading-[35px] text-[#FBFBFB]">
                  {avis.prenom} {avis.nom}
                </p>
              </div>
              <p className="w-full font-normal text-[19.5px] leading-[32px] text-white">
                &ldquo;{avis.commentaire}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN COMPONENT — switches on breakpoint
   ═══════════════════════════════════════════ */
const AvisComponent: React.FC<AvisGridProps> = ({ avis: externalAvis }) => {
  const [avisData] = useState(externalAvis || data.avis);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsDesktop(e.matches);
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isDesktop) {
    return (
      <div className="bg-gray-100">
        <DesktopStack items={avisData} />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <SectionTitle />
      <MobileStack items={avisData} />
    </div>
  );
};

export default AvisComponent;
