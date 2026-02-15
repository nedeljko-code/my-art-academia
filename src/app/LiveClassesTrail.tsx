"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useRef, useEffect } from "react";

type Props = {
  title: string;                       // koristi "\n" za nove redove
  holdMs?: number;                     // koliko dugo ostaje obojeno (ms)
  trailColors?: string[];              // boje slojeva (prvi sloj treba da bude "#000000")
  delays?: number[];                   // delay po sloju
  palette?: string[];                  // paleta za bojenje znakova
  className?: string;                  // default tipografija
  titleClassName?: string;             // override tipografije
  touchMode?: "tap" | "auto";          // ponašanje na touch: tap (default) ili auto
  autoPulseMs?: number;                // interval za auto mod (default 900ms)
};

/** Detekcija režima pokazivača: 'hover' (pointer:fine) ili 'touch' */
function usePointerMode() {
  const [mode, setMode] = useState<"hover" | "touch">("hover");
  useEffect(() => {
    const mqHover = window.matchMedia("(hover: hover)");
    const mqFine = window.matchMedia("(pointer: fine)");
    const compute = () =>
      mqHover.matches && mqFine.matches ? "hover" : "touch";
    const onChange = () => setMode(compute());
    setMode(compute());
    mqHover.addEventListener("change", onChange);
    mqFine.addEventListener("change", onChange);
    return () => {
      mqHover.removeEventListener("change", onChange);
      mqFine.removeEventListener("change", onChange);
    };
  }, []);
  return mode;
}

export default function LiveClassesTrail({
  title,
  holdMs = 5000,
  trailColors = ["#000000", "#a855f7", "#9333ea", "#8a00c2", "#ca5cdd"],
  delays = [0, 0.2, 0.22, 0.24, 0.26],
  palette = [
    "#214DEB",
    "#82C3D2",
    "#FFC52C",
    "#E58049",
    "#FFC06E",
    "#9F61E1",
    "#FFABEF",
    "#1435AA",
    "#DE471D",
    "#000000",
  ],
  className = "font-semibold text-[clamp(56px,12vw,180px)] sm:text-[clamp(64px,10vw,200px)] leading-[0.9] tracking-[clamp(0.003em,0.4vw,0.015em)]",
  titleClassName,
  touchMode = "tap",
  autoPulseMs = 900,
}: Props) {
  // Skini trailing whitespace/nove redove pa podeli na linije
  const lines = useMemo(
    () => title.replace(/\s+$/g, "").split("\n"),
    [title]
  );

  const pointerMode = usePointerMode();
  const isTouchLike = pointerMode === "touch";

  // Blago "lakše" na touch uređajima
  const effectiveHold = isTouchLike ? Math.min(holdMs, 1600) : holdMs;
  const effectiveTrail = isTouchLike ? trailColors.slice(0, 4) : trailColors;

  // Stabilne random boje po znaku
  const perChar = useMemo(
    () =>
      lines.map((line) =>
        Array.from(line).map(
          () => palette[Math.floor(Math.random() * palette.length)]
        )
      ),
    [lines, palette]
  );

  // Aktivna stanja po znaku
  const [active, setActive] = useState<boolean[][]>(() =>
    lines.map((line) => Array.from(line).map(() => false))
  );

  // Resync kad se promeni title
  useEffect(() => {
    setActive(lines.map((line) => Array.from(line).map(() => false)));
  }, [lines.join("|")]);

  // Tajmeri po znaku (da se vrate u crno posle hold-a)
  const timersRef = useRef<(ReturnType<typeof setTimeout> | null)[][]>(
    lines.map((line) => Array.from(line).map(() => null))
  );
  useEffect(() => {
    return () => {
      timersRef.current.forEach((row) =>
        row.forEach((t) => t && clearTimeout(t))
      );
    };
  }, []);

  const activate = (li: number, ci: number) => {
    setActive((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[li][ci] = true;
      return copy;
    });
    const prevTimer = timersRef.current[li]?.[ci];
    if (prevTimer) clearTimeout(prevTimer);
    if (!timersRef.current[li]) timersRef.current[li] = [];
    timersRef.current[li][ci] = setTimeout(() => {
      setActive((prev) => {
        const copy = prev.map((row) => [...row]);
        copy[li][ci] = false;
        return copy;
      });
    }, effectiveHold);
  };

  // Auto puls bojenja na touch (opciono)
  useEffect(() => {
    if (!isTouchLike || touchMode !== "auto") return;
    const id = setInterval(() => {
      if (!lines.length) return;
      const li = Math.floor(Math.random() * lines.length);
      const count = lines[li]?.length ?? 0;
      if (!count) return;
      const ci = Math.floor(Math.random() * count);
      activate(li, ci);
    }, autoPulseMs);
    return () => clearInterval(id);
  }, [isTouchLike, touchMode, autoPulseMs, lines]);

  // Bezbedni delay-evi po sloju (ako je kraći niz)
  const effDelays = useMemo(
    () =>
      effectiveTrail.map((_, i) => delays[i] ?? delays.at(-1) ?? 0),
    [effectiveTrail, delays]
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none bg-[var(--bg)] touch-manipulation">
      {effectiveTrail.map((layerColor, i) => (
        <motion.div
          key={i}
          style={{ zIndex: layerColor === "#000000" ? 10 : 0 }}
          className="absolute will-change-transform"
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 25,
            damping: 7.5,
            delay: effDelays[i],
            restDelta: 0.001,
          }}
        >
          <div className={`text-center ${titleClassName ?? className}`}>
            {lines.map((line, li) => (
              <div key={li} className={li ? "mt-2" : ""}>
                {Array.from(line).map((ch, ci) => {
                  const isTop = layerColor === "#000000";
                  const baseColor = isTop ? "#000000" : layerColor;
                  const targetColor =
                    isTop && active[li]?.[ci] ? perChar[li][ci] : baseColor;

                  const pointerProps = isTop
                    ? isTouchLike
                      ? { onPointerDown: () => activate(li, ci) } // TAP na touch
                      : { onPointerEnter: () => activate(li, ci) } // HOVER na desktop
                    : {};

                  return (
                    <motion.span
                      key={`${li}-${ci}`}
                      className={`inline-block ${
                        !isTop ? "pointer-events-none" : "cursor-pointer"
                      }`}
                      {...pointerProps}
                      animate={{ color: targetColor }}
                      transition={{ duration: 0.35 }}
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}