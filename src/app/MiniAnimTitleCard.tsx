"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  imgSrc?: string;
  reverse?: boolean;
  mediaAlign?: "left" | "center" | "right";
  className?: string;
  mediaWrapClassName?: string;
  contentClassName?: string;
  textNudge?: number;
  mediaNudge?: number;
  ctaText?: string;
  ctaHref?: string;
  showCta?: boolean;
  hideText?: boolean;
  ctaInline?: boolean;
  ctaColor?: string;
};

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
  showCta = true,
  hideText = false,
  ctaInline = false,
  ctaColor,
}: Props) {
  
  const isXl = useIsXlUp();
  const hasText = !hideText && title.trim().length > 0;
  const hasMedia = Boolean(imgSrc);
  const ctaStyle = ctaColor ? { color: ctaColor } : undefined;
  const ctaCls =
  "inline-block font-medium text-[clamp(12px,1.4vw,14px)] hover:underline";

  const cols =
    hasMedia && hasText
      ? reverse
        ? "lg:grid-cols-[2fr_3fr]"
        : "lg:grid-cols-[3fr_2fr]"
      : "lg:grid-cols-1";

  const imageJustifyXl =
    mediaAlign === "left"
      ? "xl:justify-start"
      : mediaAlign === "right"
      ? "xl:justify-end"
      : "xl:justify-center";

  const textStyle = reverse
    ? ({ marginRight: isXl ? -textNudge : 0 } as const)
    : ({ marginLeft: isXl ? -textNudge : 0 } as const);

  const mediaStyle = reverse
    ? ({ marginLeft: isXl ? -mediaNudge : 0 } as const)
    : ({ marginRight: isXl ? -mediaNudge : 0 } as const);

  const textAlignClasses = hasMedia
    ? reverse
      ? "lg:justify-self-end"
      : "lg:justify-self-start"
    : "lg:justify-self-center";

  const titleAlignClasses = hasMedia
    ? "text-center lg:text-left"
    : "text-center lg:text-center";

  const titleLines = title.split("\n");
  const lastLine = titleLines.pop() ?? "";

  return (
    <div
      className={`grid grid-cols-1 ${cols} justify-items-center lg:justify-items-center
                  gap-x-2 lg:gap-x-3 gap-y-3 p-3 lg:p-5 rounded-xl bg-[var(--bg)]
                  min-h-auto
                  lg:min-h-[clamp(180px,26vw,300px)]
                  xl:min-h-[clamp(200px,24vw,340px)]
                  ${className}  `}
    >
      {/* MEDIA samo ako ima slika */}
      {hasMedia && (
        <div
          className={`relative ${
            reverse && hasText ? "lg:order-2" : ""
          } ${mediaWrapClassName}
                      flex justify-center ${imageJustifyXl} lg:items-center
                      h-[clamp(140px,42vw,220px)]
                      sm:h-[clamp(160px,34vw,260px)]
                      xl:h-[clamp(190px,25vw,330px)]
                      w-full overflow-visible rounded-lg`}
          style={mediaStyle}
        >
          <motion.img
            src={imgSrc!}
            alt=""
            className="h-full w-auto object-contain select-none"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      )}

      {/* TEXT */}
      {hasText && (
        <div
          className={`self-center justify-self-center ${textAlignClasses} ${contentClassName}`}
          style={textStyle}
        >
          <motion.h3
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className={`font-semibold leading-tight
              text-[clamp(16px,4.2vw,22px)] lg:text-[clamp(20px,2.4vw,32px)]
              ${titleAlignClasses}`}
>
  
  {titleLines.map((ln, i) => (
    <span key={i} className="block">{ln}</span>
  ))}

  
  <span className="inline-flex items-baseline gap-[0.35em]">
    <span className="align-baseline leading-[1em]">{lastLine}</span>

    {showCta && ctaText && ctaInline && (
      <motion.a
        href={ctaHref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className={`whitespace-nowrap align-baseline leading-[1em]
                    inline-block font-medium text-[clamp(12px,1.4vw,14px)]
                    hover:underline !text-[var(--cta)]`}   
        style={ctaColor ? { color: ctaColor } : undefined}
      >
        {ctaText}
      </motion.a>
    )}
  </span>
</motion.h3>

          
          {showCta && ctaText && !ctaInline && (
            <motion.a 
            
              href={ctaHref}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
              className={`mt-2 ${ctaCls} !text-[var(--cta)]`} // koristi var(--cta) iz teme
              style={ctaStyle} // ako pošalješ ctaColor, on preboji
            >
              {ctaText}
            </motion.a>
          )}
        </div>
      )}
    </div>
  );
}
