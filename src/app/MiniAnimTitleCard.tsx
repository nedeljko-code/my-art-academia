"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;                          // koristi "\n" za dva reda
  imgSrc: string;                         // putanja do PNG/WebP
  reverse?: boolean;                      // slika desno
  mediaAlign?: "left" | "center" | "right"; // poravnanje slike u okviru kolone
  className?: string;                     // dodatne klase na root
  mediaWrapClassName?: string;            // dodatne klase na media wrap (npr. translate-y)
};

export default function ImageAnimCard({
  title,
  imgSrc,
  reverse = false,
  mediaAlign = "center",
  className = "",
  mediaWrapClassName = "",
}: Props) {
  const align =
    mediaAlign === "left"
      ? "justify-start"
      : mediaAlign === "right"
      ? "justify-end"
      : "justify-center";

  return (
    <div
      className={`h-full grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 p-4 rounded-xl border border-black/10 bg-white ${className}`}
    >
      {/* MEDIA */}
      <div
        className={`relative ${reverse ? "md:order-2" : ""} ${mediaWrapClassName}
                    flex ${align} items-center 
                    h-[clamp(140px,20vw,240px)] w-full overflow-hidden rounded-lg`}
      >
        <motion.img
          src={imgSrc}
          alt=""
          loading="eager"
          className="h-full w-auto object-contain select-none"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* TITLE (dva reda) */}
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45 }}
        className={`self-start justify-self-start text-left whitespace-pre-line
                    font-semibold leading-tight text-[clamp(18px,2.1vw,28px)]
                    ${reverse ? "md:order-1" : ""}`}
      >
        {title}
      </motion.h3>
    </div>
  );
}