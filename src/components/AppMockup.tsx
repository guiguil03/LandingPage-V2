import React, { useState, useRef, useEffect } from "react";

// ─── Screen 1: Genre assets ───────────────────────────────────────────────────
const imgGroup65    = "https://www.figma.com/api/mcp/asset/b52d00d4-4c52-456f-b97f-d57e3393eac6";
const imgGroup66    = "https://www.figma.com/api/mcp/asset/8b54b069-1e67-445e-a5b9-c8273f586b3e";
const imgGroup67    = "https://www.figma.com/api/mcp/asset/bb90ce18-2a07-404b-94a4-5f7e1e3e56ca";
const imgDrapeau1   = "https://www.figma.com/api/mcp/asset/f6152656-e797-400f-9142-5dcaab294b69";

// ─── Screen 2: Run assets ─────────────────────────────────────────────────────
const imgDrapeau2   = "https://www.figma.com/api/mcp/asset/ff7975d2-ad17-4a91-bacc-8eeee010aed4";
const run: Record<string, string> = {
  g:    "https://www.figma.com/api/mcp/asset/ef729c80-0852-4609-8aae-73663ef43a8f",
  g1:   "https://www.figma.com/api/mcp/asset/a4359b26-fe08-4bd4-b1bd-7aab92e2dbaf",
  v:    "https://www.figma.com/api/mcp/asset/2342b436-e7a3-4e69-a056-02e26efefa52",
  v1:   "https://www.figma.com/api/mcp/asset/64aa583a-957d-498e-8a69-1561659fe65b",
  v2:   "https://www.figma.com/api/mcp/asset/fde81223-dae1-4736-ba67-1219b30e0189",
  g2:   "https://www.figma.com/api/mcp/asset/c0047641-bd42-4b66-ab0b-53f0e04eba44",
  g3:   "https://www.figma.com/api/mcp/asset/a505e890-fb02-4bc7-8bc2-b535fddbdc08",
  v3:   "https://www.figma.com/api/mcp/asset/adceea57-0b0a-4f82-a67e-bbc80a7dcb89",
  g4:   "https://www.figma.com/api/mcp/asset/0d1bc480-ec81-4cae-bfba-4d1b38904c62",
  g5:   "https://www.figma.com/api/mcp/asset/b02510b9-c70d-441c-87bb-256d5840a94b",
  g6:   "https://www.figma.com/api/mcp/asset/0e17b191-caf8-42dd-b0bc-bb54a6704db8",
  g7:   "https://www.figma.com/api/mcp/asset/56c7d238-e712-4d8c-a289-11cde0f8a7c8",
  g8:   "https://www.figma.com/api/mcp/asset/0a576c15-f713-4f70-b7fd-dcd8b36a7d30",
  g9:   "https://www.figma.com/api/mcp/asset/b1350c9b-bda6-4078-b8db-b7b96e997bd0",
  g10:  "https://www.figma.com/api/mcp/asset/2a51b4f9-4798-4a16-bae4-9d7a2581293b",
  g11:  "https://www.figma.com/api/mcp/asset/64d93b9d-c6d2-4080-bb2c-2ff50ea577b3",
  g12:  "https://www.figma.com/api/mcp/asset/493ac3b7-92ad-4732-9fc7-7e3251db7346",
  g13:  "https://www.figma.com/api/mcp/asset/6f91ffa3-bd4a-4d97-a706-0cce152781ef",
  g14:  "https://www.figma.com/api/mcp/asset/8b41b926-9d8d-4f1a-864b-92a3d091a9ed",
  g15:  "https://www.figma.com/api/mcp/asset/8c751e8c-b9fe-40ce-b48f-ba07e980ed0c",
  g16:  "https://www.figma.com/api/mcp/asset/ca56eff3-5f4b-4b7f-895c-7652fba1d555",
  g17:  "https://www.figma.com/api/mcp/asset/729ec950-2395-40ca-a5c9-3574ec8c4990",
  g18:  "https://www.figma.com/api/mcp/asset/6569a226-bf64-4532-98dc-de7815d9778a",
  g19:  "https://www.figma.com/api/mcp/asset/f4af07a7-8ca5-44ac-abbb-9ed72cb3b511",
  g20:  "https://www.figma.com/api/mcp/asset/81328df5-321d-44d9-8224-aff10714e91b",
  v4:   "https://www.figma.com/api/mcp/asset/3409b91c-94c8-4357-b251-70e926607ec8",
  g21:  "https://www.figma.com/api/mcp/asset/a6736ef5-c8b1-4fcc-9e74-b2363929e857",
  g22:  "https://www.figma.com/api/mcp/asset/ff158eca-4ab3-4d42-8d50-07bfb34398a0",
  g23:  "https://www.figma.com/api/mcp/asset/0cc7c606-e051-4ac4-9089-166bcaf4b38a",
};

// ─── Dimensions ───────────────────────────────────────────────────────────────
// Screen (Figma reference)
const W = 390;
const H = 844;

// Phone frame bezels — uniform iPhone-like proportions
const FRAME_X      = 16;   // left + right bezel (matches top for visual uniformity)
const FRAME_TOP    = 16;   // top bezel
const FRAME_BOTTOM = 28;   // bottom bezel (USB-C area)

// Extra canvas padding on each side (no longer used for button protrusion, kept for centering)
const BTN_PAD      = 6;

// Phone body shape
const PHONE_BODY_W = W + FRAME_X * 2;                  // 422
const PHONE_BODY_H = H + FRAME_TOP + FRAME_BOTTOM;     // 888

// Extra transparent zone at canvas top — prevents sub-pixel clip from overflow-hidden
const TOP_PAD = 12;

// Render canvas
const PHONE_W = PHONE_BODY_W + BTN_PAD * 2;            // 434
const PHONE_H = PHONE_BODY_H + TOP_PAD;                // 900

// Corner radii — FRAME_R = SCREEN_R + FRAME_X keeps bezel thickness consistent at corners
const SCREEN_R = 55;   // matches iPhone 55pt screen corner radius
const FRAME_R  = SCREEN_R + FRAME_X;  // 71 — outer body corner

// Dynamic Island — scaled from iPhone 16 Pro (402pt) to our 390pt screen
// Apple spec: 126×37pt at 402pt width → 390/402 ≈ 0.97 scale factor
const DI_W   = 122;  // 126 × 390/402
const DI_H   = 34;   // 37 × 390/402, rounded for crispness
const DI_TOP = 11;   // slight offset from screen top

// Convert Figma inset percentages → absolute px style (within W×H canvas)
function pos(tPct: number, rPct: number, bPct: number, lPct: number): React.CSSProperties {
  const left   = (lPct / 100) * W;
  const top    = (tPct / 100) * H;
  const width  = W - left - (rPct / 100) * W;
  const height = H - top  - (bPct / 100) * H;
  return { position: "absolute", top, left, width, height };
}

// ─── Progress bar (shared) ────────────────────────────────────────────────────
function ProgressBar({ pct, drapeau }: { pct: number; drapeau: string }) {
  return (
    <>
      <img src={drapeau} alt="" style={{ position: "absolute", top: 80, left: 328, width: 41.678, height: 51, zIndex: 2 }} />
      <div style={{ position: "absolute", top: 122, left: 52, width: 286, height: 7, zIndex: 1 }}>
        <div className="w-full h-full bg-[#D5CFFB] rounded-full overflow-hidden">
          <div className="h-full bg-[#7D80F4] rounded-full" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </>
  );
}

// ─── Screen 1: Votre genre ────────────────────────────────────────────────────
const genders = [
  { id: "male"   as const, label: "Homme", src: imgGroup65 },
  { id: "female" as const, label: "Femme",  src: imgGroup66 },
  { id: "other"  as const, label: "Autre",  src: imgGroup67 },
];

function GenreScreen({
  selected, setSelected, onNext,
}: {
  selected: "male" | "female" | "other" | null;
  setSelected: (v: "male" | "female" | "other" | null) => void;
  onNext: () => void;
}) {
  const [hovered,    setHovered]    = useState<"male" | "female" | "other" | null>(null);
  const [btnHovered, setBtnHovered] = useState(false);
  const [btnActive,  setBtnActive]  = useState(false);

  return (
    <div className="bg-[#EAE3F4] flex flex-col select-none overflow-hidden relative" style={{ width: W, height: H }}>
      <ProgressBar pct={80} drapeau={imgDrapeau1} />

      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-[42px]" style={{ width: 295 }}>

          <div className="w-full">
            <p className="font-semibold text-[#A9A0F3]" style={{ fontSize: 24 }}>Sélectionnez</p>
            <h2 className="font-black text-[#7D80F4] leading-tight" style={{ fontSize: 36 }}>Votre genre</h2>
          </div>

          <div className="flex gap-[33px] items-start">
            {genders.map(({ id, label, src }) => {
              const isSelected = selected === id;
              const isHovered  = hovered  === id;
              return (
                <button
                  key={id}
                  tabIndex={-1}
                  onClick={() => setSelected(id as "male" | "female" | "other")}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  className="flex flex-col items-center cursor-pointer"
                  style={{
                    width: 83, gap: 8,
                    transform: `scale(${isSelected ? 1.1 : isHovered ? 1.06 : 1})`,
                    transition: "transform 0.18s ease",
                  }}
                >
                  <img src={src} alt={label} style={{ width: 83, height: 88 }} className="object-contain" />
                  <span className="font-black" style={{ fontSize: 12, color: isSelected ? "#7D80F4" : "#201A41" }}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            tabIndex={-1}
            onClick={() => { if (selected) onNext(); }}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => { setBtnHovered(false); setBtnActive(false); }}
            onMouseDown={() => setBtnActive(true)}
            onMouseUp={() => setBtnActive(false)}
            className="w-full text-white font-black"
            style={{
              fontSize: 16,
              padding: "15px 0",
              borderRadius: 55,
              background: selected ? (btnHovered ? "#6a6de0" : "#7D80F4") : "#A9A0F3",
              transform: btnActive ? "scale(0.97)" : (btnHovered && selected) ? "scale(1.03)" : "scale(1)",
              transition: "background 0.2s ease, transform 0.15s ease",
              cursor: selected ? "pointer" : "default",
            }}
          >
            Suivant
          </button>

        </div>
      </div>
    </div>
  );
}

// ─── Screen 2: On va courir ? ─────────────────────────────────────────────────
const AUTO_RESET_DELAY = 5000;

function RunScreen({ onReset, active }: { onReset: () => void; active: boolean }) {
  const [btnHovered, setBtnHovered] = useState(false);
  const [btnActive,  setBtnActive]  = useState(false);
  const dimmingRef = useRef(false);

  const triggerDimReset = () => {
    if (dimmingRef.current) return;
    dimmingRef.current = true;
    onReset();
  };

  useEffect(() => {
    if (!active) dimmingRef.current = false;
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(triggerDimReset, AUTO_RESET_DELAY);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="bg-[#EAE3F4] select-none overflow-hidden relative" style={{ width: W, height: H }}>
      <ProgressBar pct={100} drapeau={imgDrapeau2} />

      <div style={{ position: "absolute", top: 224, left: 19, width: 304 }}>
        <p className="font-semibold text-[#A9A0F3]" style={{ fontSize: 24, lineHeight: "43px" }}>Tout est prêt !</p>
        <h2 className="font-black text-[#7D80F4]" style={{ fontSize: 36, lineHeight: "43px" }}>On va courir ?</h2>
      </div>

      <img alt="" src={run.g}   style={pos(42.03, 21.31, 52.79, 67.38)} />
      <img alt="" src={run.g1}  style={pos(58.20, 44.67, 35.44, 43.73)} />
      <img alt="" src={run.v}   style={pos(59.78, 48.85, 35.42, 43.59)} />
      <img alt="" src={run.v1}  style={pos(63.72, 49.16, 36.04, 48.65)} />
      <img alt="" src={run.v2}  style={pos(60.44, 53.91, 39.04, 44.95)} />
      <img alt="" src={run.g2}  style={pos(61.11, 47.98, 37.47, 48.51)} />
      <img alt="" src={run.g3}  style={pos(61.95, 49.52, 36.73, 48.70)} />
      <img alt="" src={run.v3}  style={pos(60.58, 49.07, 35.56, 43.96)} />
      <img alt="" src={run.g4}  style={pos(48.12, 30.71, 38.64, 48.98)} />
      <img alt="" src={run.g5}  style={pos(60.95, 11.88, 34.53, 75.26)} />
      <img alt="" src={run.g6}  style={pos(62.12, 11.85, 34.49, 77.22)} />
      <img alt="" src={run.g7}  style={pos(48.12, 18.50, 37.26, 60.85)} />
      <img alt="" src={run.g8}  style={pos(40.76, 32.52, 56.08, 58.18)} />
      <img alt="" src={run.g9}  style={pos(44.34, 29.46, 51.87, 62.00)} />
      <img alt="" src={run.g10} style={pos(44.40, 29.47, 52.20, 62.08)} />
      <img alt="" src={run.g11} style={pos(43.20, 30.80, 54.98, 67.03)} />
      <img alt="" src={run.g12} style={pos(41.36, 27.76, 55.89, 66.58)} />
      <img alt="" src={run.g13} style={pos(44.50, 32.02, 48.75, 58.27)} />
      <img alt="" src={run.g14} style={pos(44.48, 56.80, 48.62, 34.23)} />
      <img alt="" src={run.g15} style={pos(52.43, 77.58, 42.83, 11.80)} />
      <img alt="" src={run.g16} style={pos(52.40, 82.30, 42.81, 11.79)} />
      <img alt="" src={run.g17} style={pos(48.90, 56.35, 43.04, 17.70)} />
      <img alt="" src={run.g18} style={pos(61.01, 38.16, 34.53, 49.29)} />
      <img alt="" src={run.g19} style={pos(62.23, 38.12, 34.49, 50.85)} />
      <img alt="" src={run.g20} style={pos(48.90, 43.54, 36.50, 36.01)} />
      <img alt="" src={run.v4}  style={pos(44.44, 55.20, 50.05, 34.88)} />
      <img alt="" src={run.g21} style={pos(43.74, 55.76, 54.61, 41.52)} />
      <img alt="" src={run.g22} style={pos(41.58, 53.80, 55.53, 41.05)} />
      <img alt="" src={run.g23} style={pos(44.84, 45.62, 50.86, 39.05)} />

      <button
        tabIndex={-1}
        onClick={triggerDimReset}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => { setBtnHovered(false); setBtnActive(false); }}
        onMouseDown={() => setBtnActive(true)}
        onMouseUp={() => setBtnActive(false)}
        className="text-white font-black"
        style={{
          position: "absolute",
          top: 591,
          left: "50%",
          transform: `translateX(-50%) scale(${btnActive ? 0.97 : btnHovered ? 1.03 : 1})`,
          width: 295,
          fontSize: 16,
          padding: "15px 0",
          borderRadius: 55,
          background: btnHovered ? "#6a6de0" : "#7D80F4",
          transition: "background 0.2s ease, transform 0.15s ease",
          cursor: "pointer",
        }}
      >
        C'est parti !
      </button>
    </div>
  );
}

// ─── iPhone 17 Pro chrome ─────────────────────────────────────────────────────
// Body left/right edges sit BTN_PAD px inset from the canvas edges
// so that side-buttons can protrude leftward / rightward beyond the body.
const bodyLeft  = BTN_PAD;
const bodyRight = BTN_PAD; // used as css `right` value

function PhoneChrome() {
  return (
    <>
      {/* ── Main body ── */}
      <div style={{
        position: "absolute",
        top: TOP_PAD,
        left: bodyLeft,
        right: bodyRight,
        bottom: 0,
        borderRadius: FRAME_R,
        background: "linear-gradient(160deg, #2c2c2e 0%, #1c1c1e 50%, #111113 100%)",
        boxShadow: [
          "inset 0 0 0 0.5px rgba(255,255,255,0.10)",
          "inset 0 1px 0 rgba(255,255,255,0.08)",
          "inset 0 -1px 0 rgba(0,0,0,0.45)",
          "0 0 0 1px rgba(0,0,0,0.6)",
        ].join(", "),
      }}>
        {/* ── 2. Glass bezel (absorbs sub-pixel bleeding from screen mask) ── */}
        <div style={{
          position: "absolute",
          inset: 1,
          borderRadius: FRAME_R - 1,
          background: "#000",
        }} />
      </div>

      {/* ── 3. Edge specular highlights — after body, naturally on top ── */}
      <div style={{
        position: "absolute",
        top: TOP_PAD + FRAME_R * 0.55,
        bottom: FRAME_R * 0.55,
        left: bodyLeft,
        width: 1,
        background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.16) 25%, rgba(255,255,255,0.08) 75%, transparent)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: TOP_PAD + FRAME_R * 0.55,
        bottom: FRAME_R * 0.55,
        right: bodyRight,
        width: 1,
        background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.09) 25%, rgba(255,255,255,0.05) 75%, transparent)",
        pointerEvents: "none",
      }} />

      {/* ── 4. Bottom details ── */}
      <div style={{
        position: "absolute",
        bottom: 9,
        left: PHONE_W / 2 - 27,
        width: 54,
        height: 10,
        borderRadius: 5,
        background: "#0a0a0c",
        boxShadow: "inset 0 2px 3px rgba(0,0,0,0.95), 0 1px 0 rgba(255,255,255,0.05)",
      }} />
      <div style={{ position: "absolute", bottom: 11, left: PHONE_W / 2 - 86, display: "flex", gap: 4 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ width: 4, height: 6, borderRadius: 2, background: "#0c0c0e", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.9)" }} />
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 11, left: PHONE_W / 2 + 54, display: "flex", gap: 4 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ width: 4, height: 6, borderRadius: 2, background: "#0c0c0e", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.9)" }} />
        ))}
      </div>
    </>
  );
}

// ─── Wrapper: scale + screen transitions ─────────────────────────────────────
export default function AppMockup({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale,    setScale]    = useState(1);
  const [screen,   setScreen]   = useState<"genre" | "run">("genre");
  const [blackout, setBlackout] = useState(false);
  const [selected, setSelected] = useState<"male" | "female" | "other" | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setScale(entries[0].contentRect.width / PHONE_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goToRun = () => setScreen("run");

  const goToGenre = () => {
    setBlackout(true);
    setTimeout(() => {
      setScreen("genre");
      setSelected(null);
    }, 420);
    setTimeout(() => setBlackout(false), 500);
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{ aspectRatio: `${PHONE_W} / ${PHONE_H}` }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: PHONE_W,
          height: PHONE_H,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        {/* ── Phone chrome (behind screen) ── */}
        <PhoneChrome />

        {/* ── Screen area with rounded clip ── */}
        <div
          style={{
            position: "absolute",
            top: TOP_PAD + FRAME_TOP,
            left: BTN_PAD + FRAME_X,
            width: W,
            height: H,
            borderRadius: SCREEN_R,
            overflow: "hidden",
            background: "#000",
            willChange: "transform",
            transform: "translateZ(0)",
            WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          }}
        >
          {/* Slide container: genre → run */}
          <div
            style={{
              display: "flex",
              width: W * 2,
              height: H,
              transform: `translateX(${screen === "run" ? -W : 0}px)`,
              transition: screen === "run" ? "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            }}
          >
            <div style={{ width: W, height: H, flexShrink: 0 }}>
              <GenreScreen selected={selected} setSelected={setSelected} onNext={goToRun} />
            </div>
            <div style={{ width: W, height: H, flexShrink: 0 }}>
              <RunScreen onReset={goToGenre} active={screen === "run"} />
            </div>
          </div>

          {/* Blackout — within screen only */}
          <div
            style={{
              position: "absolute",
              inset: -5,
              background: "black",
              opacity: blackout ? 1 : 0,
              transition: blackout ? "opacity 0.35s ease" : "opacity 0.35s ease 0.1s",
              pointerEvents: "none",
              zIndex: 100,
              transform: "translateZ(0)",
            }}
          />
        </div>

        {/* ── Dynamic Island — above screen content ── */}
        <div
          style={{
            position: "absolute",
            top: TOP_PAD + FRAME_TOP + DI_TOP,
            left: BTN_PAD + FRAME_X + (W - DI_W) / 2,
            width: DI_W,
            height: DI_H,
            borderRadius: DI_H / 2,
            background: "#000",
            zIndex: 30,
            boxShadow: "0 0 0 2px rgba(0,0,0,0.6)",
          }}
        />
      </div>
    </div>
  );
}
