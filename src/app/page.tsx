"use client";

// import LiveClasses from "./LiveClasses";
import LiveClassesTrail from "./LiveClassesTrail";
import MiniAnimTitleCard from "./MiniAnimTitleCard";
import Header from "./Header";
import ImageAnimCard from "./ImageAnimCard";

export default function Home() {
  return (
    <section className="w-screen min-h-screen bg-[#efeeee] grid grid-rows-[30vh_40vh_30vh]">
      {/* TOP (30vh) */}
      <Header
        membershipImage="/images/Membership-LiveC (1).png"
        activeLinkId="reviews"
        rightTitles={[
          "Weekly Art Club",
          "Semester Long Art Course",
          "Private Programs",
        ]}
      />

      {/* MIDDLE (40vh) */}
      <div className="relative overflow-hidden flex items-center justify-center">
        {/* <VideoAnimataion /> */}
        <LiveClassesTrail title={"LIVE\nCLASSES"} />
      </div>

      {/* BOTTOM (30vh) */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-6 items-stretch">
  <ImageAnimCard
    title={`Weekly\nArt Club`}
    imgSrc="/images/weekly.png"
    layout="mediaWide"
    overlap={8}          // sliku mrvicu ka tekstu
    nudge={8}            // i tekst mrvicu ka slici
    className="pt-2 pb-6"
  />

  <ImageAnimCard
    title={`Semester Long\nArt Course`}
    imgSrc="/images/portrait.png"
    layout="mediaWide"
    overlap={6}
    nudge={6}
    className="pt-6 pb-2"
  />

  <ImageAnimCard
  title={`Private\nPrograms`}
  imgSrc="/images/flowers.png"
  reverse
  layout="even"
  tight
  overlap={16}
  nudge={12}
  yOffset={2}
  titleAlign="center"   // 👈 centrira tekst i CTA
/>
</div>
    </section>
  );
}
