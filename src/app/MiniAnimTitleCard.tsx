"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  imgSrc: string;
  reverse?: boolean;
  mediaAlign?: "left" | "center" | "right";
  className?: string;
  mediaWrapClassName?: string;
  contentClassName?: string;
  textNudge?: number;
  mediaNudge?: number;
  ctaText?: string;
  ctaHref?: string;
};

/** true kada je viewport >= 1280px (Tailwind xl) */
function useIsXlUp() {
  const [isXl, setIsXl] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 1280px)");
    const onChange = (e: MediaQueryListEvent) => setIsXl(e.matches);
    setIsXl(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);
  return isXl;
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
  const isXl = useIsXlUp();

  // 2 kolone kreću tek od xl
  const cols = reverse ? "lg:grid-cols-[2fr_3fr]" : "lg:grid-cols-[3fr_2fr]";

  const imageJustifyXl =
    mediaAlign === "left"
      ? "xl:justify-start"
      : mediaAlign === "right"
      ? "xl:justify-end"
      : "xl:justify-center";

  // nudge tek od xl
  const textStyle: React.CSSProperties = reverse
    ? { marginRight: isXl ? -textNudge : 0 }
    : { marginLeft: isXl ? -textNudge : 0 };

  const mediaStyle: React.CSSProperties = reverse
    ? { marginLeft: isXl ? -mediaNudge : 0 }
    : { marginRight: isXl ? -mediaNudge : 0 };

  return (
    <div
      className={`grid grid-cols-1 ${cols} items-center lg:items-center
                  gap-x-2 xl:gap-x-3 gap-y-3 p-3 xl:p-5 rounded-xl bg-[#E8E6DF]
                  min-h-[clamp(160px,44vw,240px)]
                  sm:min-h-[clamp(180px,36vw,280px)]
                  xl:min-h-[clamp(200px,26vw,340px)]
                  ${className}`}
    >
      {/* MEDIA */}
      <div
         className={`relative ${reverse ? "lg:order-2" : ""} ${mediaWrapClassName}
+             flex justify-center lg:justify-center ${imageJustifyXl} lg:items-center
                    h-[clamp(140px,42vw,220px)]
                    sm:h-[clamp(160px,34vw,260px)]
                    xl:h-[clamp(190px,25vw,330px)]
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
                    ${reverse ? "lg:justify-self-end" : "lg:justify-self-start"}
                    ${contentClassName}`}
        style={textStyle}
      >
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="whitespace-pre-line font-semibold leading-tight
             text-[clamp(16px,4.2vw,22px)] xl:text-[clamp(20px,2.4vw,32px)]
             text-center lg:text-left"
        >
          {title}
        </motion.h3>

        {ctaText && (
          <motion.a
            href={ctaHref}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 3, delay: 0.12, ease: "easeOut" }}
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