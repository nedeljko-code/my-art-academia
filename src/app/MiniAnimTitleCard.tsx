"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  /** Naslov — koristi "\n" za 2 reda (npr. "Private\nPrograms") */
  title: string;
  /** Putanja do PNG/WebP (npr. "/images/flowers.png") */
  imgSrc: string;
  /** Ako je true: slika je desno, tekst levo */
  reverse?: boolean;
  /** Poravnanje slike u svojoj koloni (za desktop) */
  mediaAlign?: "left" | "center" | "right";
  /** Dodatne klase za root (karticu) */
  className?: string;
  /** Dodatne klase za omotač slike */
  mediaWrapClassName?: string;
  /** Dodatne klase za omotač teksta */
  contentClassName?: string;
  /** U px: privuci TEKST ka slici (negativni margin iznutra) */
  textNudge?: number;
  /** U px: privuci SLIKU ka tekstu (negativni margin iznutra) */
  mediaNudge?: number;
  /** CTA ispod naslova (ostavi prazno ako ne želiš CTA) */
  ctaText?: string;
  ctaHref?: string;
};

/** mali hook: true kada je viewport >= 768px (Tailwind md) */
function useIsMdUp() {
  const [isMd, setIsMd] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => setIsMd(e.matches);
    setIsMd(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);
  return isMd;
}

export default function MiniAnimTitleCard({
  title,
  imgSrc,
  reverse = false,
  mediaAlign = "center",
  className = "",
  mediaWrapClassName = "",
  contentClassName = "",
  textNudge = 0,
  mediaNudge = 0,
  ctaText = "Learn more",
  ctaHref = "#",
}: Props) {
  const isMd = useIsMdUp();

  // širine kolona (na desktopu slici desno damo malo više prostora)
  const cols = reverse ? "md:grid-cols-[2fr_3fr]" : "md:grid-cols-[3fr_2fr]";

  // poravnanje slike na DESKTOPU (na mobilu centriramo)
  const imageJustifyMd =
    mediaAlign === "left"
      ? "md:justify-start"
      : mediaAlign === "right"
      ? "md:justify-end"
      : "md:justify-center";

  // responsive nudge (0 na mobilu, negativan tek na md+)
  const textStyle: React.CSSProperties = reverse
    ? { marginRight: isMd ? -textNudge : 0 }
    : { marginLeft: isMd ? -textNudge : 0 };

  const mediaStyle: React.CSSProperties = reverse
    ? { marginLeft: isMd ? -mediaNudge : 0 }
    : { marginRight: isMd ? -mediaNudge : 0 };

  return (
    <div
      className={`grid grid-cols-1 ${cols} items-center md:items-end
                  gap-x-2 md:gap-x-3 gap-y-3 p-3 md:p-5 rounded-xl bg-[#E8E6DF]
                  min-h-[clamp(160px,44vw,240px)]
                  sm:min-h-[clamp(180px,36vw,280px)]
                  md:min-h-[clamp(200px,26vw,340px)]
                  ${className}`}
    >
      {/* MEDIA */}
      <div
        className={`relative ${
          reverse ? "md:order-2" : ""
        } ${mediaWrapClassName}
                    flex justify-end ${imageJustifyMd} md:items-end
                    h-[clamp(140px,42vw,220px)]
                    sm:h-[clamp(160px,34vw,260px)]
                    md:h-[clamp(190px,25vw,330px)]
                    w-full overflow-visible rounded-lg`}
        style={mediaStyle}
      >
        <motion.img
          src={imgSrc}
          alt=""
          className="h-full w-auto object-contain select-none"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* TEXT */}
      <div
        className={`self-center justify-self-center
                    ${reverse ? "md:justify-self-end" : "md:justify-self-start"}
                    ${contentClassName}`}
        style={textStyle}
      >
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }} // mrvu sporije
          className="whitespace-pre-line font-semibold leading-tight
             text-[clamp(16px,4.2vw,22px)] md:text-[clamp(20px,2.4vw,32px)]
             text-center md:text-left"
        >
          {title}
        </motion.h3>

        {ctaText && (
          <motion.a
            href={ctaHref}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 3, delay: 0.12, ease: "easeOut" }} // kasni za naslovom
            className="mt-2 inline-block text-[clamp(12px,1.4vw,14px)] font-medium
             text-[#FFABEF] hover:underline"
          >
            {ctaText}
          </motion.a>
        )}
      </div>
    </div>
  );
}
