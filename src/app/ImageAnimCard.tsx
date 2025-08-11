"use client";
import { CSSProperties } from "react";

type Props = {
  title: string;
  imgSrc: string;
  className?: string;
  reverse?: boolean;
  layout?: "mediaWide" | "even" | "contentWide";
  tight?: boolean;
  nudge?: number;              // move TEXT towards image
  overlap?: number;            // move IMAGE towards text (negative margin)
  yOffset?: number;            // vertical tweak for image
  ctaText?: string;
  ctaHref?: string;
  mediaClassName?: string;
  contentClassName?: string;
  titleAlign?: "left" | "center" | "right";
};

export default function ImageAnimCard({
  title,
  imgSrc,
  className = "",
  reverse = false,
  layout = "mediaWide",
  tight = false,
  nudge = 0,
  overlap = 0,
  yOffset = 0,
  ctaText = "Learn more",
  ctaHref = "#",
  mediaClassName = "",
  contentClassName = "",
  titleAlign = "left",
}: Props) {
  // text align helpers
  const textAlignClass =
    titleAlign === "center" ? "text-center" :
    titleAlign === "right"  ? "text-right"  : "text-left";

  const justifySelfClass =
    titleAlign === "center" ? "justify-self-center" :
    titleAlign === "right"  ? "justify-self-end"   : "justify-self-start";

  // grid column presets
  const layoutMap = {
    mediaWide: "md:grid-cols-[3fr_2fr]",
    even: "md:grid-cols-[2.5fr_2.5fr]",
    contentWide: "md:grid-cols-[2fr_3fr]",
  } as const;

  const layoutClass = reverse
    ? layout === "mediaWide"
      ? layoutMap.contentWide
      : layout === "contentWide"
      ? layoutMap.mediaWide
      : layoutMap.even
    : layoutMap[layout];

  const gapClass = tight ? "gap-2 md:gap-3" : "gap-3 md:gap-4";

  // pull TEXT closer
  const textNudgeStyle: CSSProperties =
    nudge > 0
      ? (reverse ? { marginRight: -nudge } : { marginLeft: -nudge })
      : {};

  // pull IMAGE closer (+ optional vertical offset)
  const mediaNudgeStyle: CSSProperties = {
    ...(overlap > 0
      ? reverse
        ? { marginRight: -overlap }
        : { marginLeft: -overlap }
      : {}),
    ...(yOffset !== 0 ? { transform: `translateY(${yOffset}px)` } : {}),
  };

  return (
    <div
      className={`h-full grid grid-cols-1 ${layoutClass} ${gapClass} px-4 p-4
                  rounded-xl border border-black/10 bg-white items-center
                  min-h-[clamp(160px,22vw,260px)] ${className}`}
    >
      {/* IMAGE */}
      <div
        className={`flex items-center ${reverse ? "md:justify-start" : "md:justify-end"}
                    justify-center h-full w-full overflow-hidden rounded-lg
                    ${reverse ? "md:order-2" : ""} ${mediaClassName}`}
        style={mediaNudgeStyle}
      >
        <img
          src={imgSrc}
          alt=""
          className="max-h-full w-auto object-contain select-none"
        />
      </div>

      {/* TEXT + CTA */}
      <div
        className={`self-center ${justifySelfClass} ${reverse ? "md:order-1" : ""} ${contentClassName}`}
        style={textNudgeStyle}
      >
        <h3
          className={`whitespace-pre-line font-semibold leading-tight ${textAlignClass}
                      text-[clamp(18px,2.1vw,28px)]`}
        >
          {title}
        </h3>

        <a
          href={ctaHref}
          className={`mt-2 inline-block text-[clamp(12px,1.4vw,14px)] font-medium
                      text-[#FFABEF] hover:underline ${titleAlign === "center" ? "mx-auto" : ""}`}
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}