"use client";

import LiveClassesTrail from "@/app/LiveClassesTrail";
import MiniAnimTitleCard from "@/app/MiniAnimTitleCard";
import Header from "@/app/Header";

export default function ClassesPage() {
  return (
    <section
      className="
        w-full min-h-screen theme-sky bg-[var(--bg)] 
        grid grid-rows-[auto_auto_auto]                 /* mob–lg: sve auto */
        xl:grid-rows-[auto_minmax(28vh,40vh)_auto]      /* tek od xl fiksiramo srednji max */
      "
    >
      <Header
        membershipImage="/images/Membership-LiveC (1).png"
        activeLinkId="reviews"
        rightTitles={[
          "Our Creative Team",
          "Our Story",
          "Our Mission",
          "Behind the scenes",
        ]}
      />

      {/* MIDDLE */}
      <div
        className="relative overflow-hidden flex items-center justify-center
                   py-6 md:py-8 xl:py-0 h-[clamp(180px,32vw,420px)] xl:h-auto"
      >
        <LiveClassesTrail
          title={"INSIDE\nOUR\nSTUDIO"}
          className="font-semibold leading-[0.9] tracking-[0.01em]
             text-[clamp(28px,7vw,64px)] sm:text-[clamp(32px,6.5vw,72px)]
             lg:text-[clamp(50px,9vw,162px)]"
        />
      </div>

      {/* BOTTOM */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-[clamp(16px,4vw,32px)] lg:gap-8 px-0 sm:px-4 md:px-6 items-stretch">
        <MiniAnimTitleCard
  title={`Our\nCreative\nTeam`}
  contentClassName="justify-self-center w-fit text-left [&_h3]:!text-left [&_a]:!text-left"
/>

<MiniAnimTitleCard
  title={`Our\nStory`}
  contentClassName="justify-self-center w-fit text-left [&_h3]:!text-left [&_a]:!text-left"
/>

<MiniAnimTitleCard
  title={`Our\nMission`}
  contentClassName="justify-self-center w-fit text-left [&_h3]:!text-left [&_a]:!text-left"
/>

<MiniAnimTitleCard
  title={`Behind\nthe\nscenes`}
  ctaColor="#214DEB"
  contentClassName="justify-self-center w-fit text-left [&_h3]:!text-left [&_a]:!text-left"
/>
      </div>
    </section>
  );
}
