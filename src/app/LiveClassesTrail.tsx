"use client";
import { motion } from "framer-motion";
import { useMemo, useState, useRef, useEffect } from "react";

type Props = {
  title: string;                 // npr: "LIVE\nCLASSES"
  holdMs?: number;               // koliko ostaje obojeno posle hover-a (ms)
  trailColors?: string[];        // boje slojeva (prvi treba da bude "#000000")
  delays?: number[];             // delay po sloju
  palette?: string[];            // paleta za slova na hover (logo boje)
  className?: string;            // tipografija: npr "text-9xl font-semibold tracking-[0.01em]"
};

export default function ColorTrailTitle({
  title,
  holdMs = 5000,
  trailColors = ["#000000","#a855f7","#9333ea","#8a00c2","#ca5cdd"],
  delays = [0, 0.2, 0.22, 0.24, 0.26],
  palette = ["#214DEB","#82C3D2","#FFC52C","#E58049","#FFC06E","#9F61E1","#FFABEF","#1435AA","#DE471D","#000000"],
  className = "text-9xl font-semibold tracking-[0.01em]"
}: Props) {
  const lines = useMemo(() => title.split("\n"), [title]);

  // stabilne random boje po slovu (da se ne menjaju na re-render)
  const perChar = useMemo(
    () => lines.map(line =>
      Array.from(line).map(
        () => palette[Math.floor(Math.random() * palette.length)]
      )
    ),
    [lines, palette]
  );

  // aktivno stanje po slovu (true = obojeno)
  const [active, setActive] = useState<boolean[][]>(
    () => lines.map(line => Array.from(line).map(() => false))
  );

  // resync ako se promeni title (dužina linija/slova)
  useEffect(() => {
    setActive(lines.map(line => Array.from(line).map(() => false)));
  }, [lines.join("|")]);

  // tajmeri po slovu (da posle holdMs vrate u crno)
  const timersRef = useRef<(ReturnType<typeof setTimeout> | null)[][]>(
    lines.map(line => Array.from(line).map(() => null))
  );
  useEffect(() => {
    return () => {
      timersRef.current.forEach(row => row.forEach(t => t && clearTimeout(t)));
    };
  }, []);

  const activate = (li: number, ci: number) => {
    setActive(prev => {
      const copy = prev.map(row => [...row]);
      copy[li][ci] = true;
      return copy;
    });
    const prevTimer = timersRef.current[li]?.[ci];
    if (prevTimer) clearTimeout(prevTimer);
    // @ts-ignore: init rows if needed
    if (!timersRef.current[li]) timersRef.current[li] = [];
    timersRef.current[li][ci] = setTimeout(() => {
      setActive(prev => {
        const copy = prev.map(row => [...row]);
        copy[li][ci] = false;
        return copy;
      });
    }, holdMs);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center  overflow-hidden select-none bg-[#efeeee]">
      {trailColors.map((layerColor, i) => (
        <motion.div
          key={i}
          style={{ zIndex: layerColor === "#000000" ? 10 : 0 }}
          className="absolute"
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 25, damping: 7.5, delay: delays[i] ?? 0, restDelta: 0.001 }}
        >
          <div className={`text-center ${className}`}>
            {lines.map((line, li) => (
              <div key={li} className={li ? "mt-2" : ""}>
                {Array.from(line).map((ch, ci) => {
                  const isTop = layerColor === "#000000";
                  const baseColor = isTop ? "#000000" : layerColor;
                  const targetColor = isTop && active[li]?.[ci] ? perChar[li][ci] : baseColor;
                  return (
                    <motion.span
                      key={`${li}-${ci}`}
                      className={`inline-block ${!isTop ? "pointer-events-none" : ""}`}
                      onHoverStart={isTop ? () => activate(li, ci) : undefined}
                      animate={{ color: targetColor }}
                      transition={{ duration: 0.4 }}
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