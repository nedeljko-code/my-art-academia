"use client";

import LiveClassesTrail from "@/app/LiveClassesTrail";
import MiniAnimTitleCard from "@/app/MiniAnimTitleCard";
import Header from "@/app/Header";

export default function AnytimePage() {
  return (
    <section
      className="
        w-full min-h-screen theme-lavender bg-[var(--bg)]
        grid grid-rows-[auto_auto_auto]
        xl:grid-rows-[auto_minmax(28vh,40vh)_auto]
      "
    >
      <Header
        membershipImage="/images/Membership-LiveC (1).png"
        activeLinkId="reviews"
        rightTitles={[
          "Realistic Drawing Style",
          "Anime Drawing Style",
        ]}
      />

      {/* HERO */}
      <div className="relative overflow-hidden flex items-center justify-center 
                      py-6 md:py-8 xl:py-0 h-[clamp(180px,32vw,420px)] xl:h-auto">
        <LiveClassesTrail title={"CREATE\nANYTIME"} />
      </div>

      {/* GRID: manji razmaci + uža sredina */}
      <div className="
        grid grid-cols-1
        lg:grid-cols-[1fr_minmax(120px,20vw)_1fr]
        gap-y-[clamp(12px,3vw,20px)]
        lg:gap-x-[clamp(8px,2vw,16px)]
        px-0 sm:px-4 md:px-6 items-end
      ">
        <MiniAnimTitleCard
          title={`Realistic\nDrawing\nStyle`}
          imgSrc="/images/createAnytime/realisticGirl.png"
          mediaAlign="right"
          textNudge={12}
          mediaNudge={12}
          className="!min-h-[clamp(140px,22vw,220px)]"
          mediaWrapClassName="xl:-mr-3"
        />

        {/* SREDINA: slika bez teksta/CTA */}
        <MiniAnimTitleCard
          title=""
          hideText
          showCta={false}
          imgSrc="/images/createAnytime/cat-6.png"
          mediaAlign="center"
          className="!min-h-[clamp(140px,20vw,220px)]"
        />

        <MiniAnimTitleCard
          title={`Anime\nDrawing\nStyle`}
          imgSrc="/images/createAnytime/animeGirl.png"
          reverse
          mediaAlign="left"
          textNudge={12}
          mediaNudge={12}
          className="!min-h-[clamp(140px,22vw,220px)] xl:[&_h3]:-mr-2 xl:[&_img]:-ml-2"
        />
      </div>
    </section>
  );
}