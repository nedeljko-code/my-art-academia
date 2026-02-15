"use client";

import LiveClassesTrail from "@/app/LiveClassesTrail";
import MiniAnimTitleCard from "@/app/MiniAnimTitleCard";
import Header from "@/app/Header"

export default function ClassesPage() {
  return (
    <section
      className="
        w-full min-h-screen theme-cream bg-[var(--bg)]
        grid grid-rows-[auto_auto_auto]                 /* mob–lg: sve auto */
        xl:grid-rows-[auto_minmax(28vh,40vh)_auto]      /* tek od xl fiksiramo srednji max */
      "
    >
      <Header
        membershipImage="/images/Membership-LiveC (1).png"
        activeLinkId="reviews"
        rightTitles={[
          "Gift Card",
          "Our Stickers",
          "Our Stationary",
          "Our Art Supplies",
          "Our Paper Projects"
          
        ]}
      />

      {/* MIDDLE */}
      <div
        className="relative overflow-hidden flex items-center justify-center
                   py-6 md:py-8 xl:py-0 h-[clamp(180px,32vw,420px)] xl:h-auto"
      >
        <LiveClassesTrail title={"ART\nSHOP"} />
      </div>

      {/* BOTTOM */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-[clamp(16px,4vw,32px)] lg:gap-8 px-0 sm:px-4 md:px-6 items-stretch">
        <MiniAnimTitleCard
          title={`Gift\nSCard`}
          
          mediaAlign="right"
          textNudge={12}
          mediaNudge={12}
          mediaWrapClassName="xl:-mr-5" /* nudge tek od xl */
        />

        <MiniAnimTitleCard
          title={`Our\nStickers`}
          
          mediaAlign="right"
          textNudge={24}
          mediaNudge={24}
          mediaWrapClassName="xl:-mr-5"
        />

        <MiniAnimTitleCard
          title={`Our\nStationary`}
          
          
          mediaAlign="left"
          textNudge={12}
          mediaNudge={12}
          className="xl:[&_h3]:-mr-3 xl:[&_img]:-ml-3" /* nudge tek od xl */
        />
        <MiniAnimTitleCard
          title={`Our\nArt\nSupplies`}
          
          mediaAlign="right"
          textNudge={24}
          mediaNudge={24}
          mediaWrapClassName="xl:-mr-5"
        />
        <MiniAnimTitleCard
          title={`Our\nPaper\nProjects`}
          
          mediaAlign="right"
          textNudge={24}
          mediaNudge={24}
          mediaWrapClassName="xl:-mr-5"
        />
      </div>
    </section>
  );
}
