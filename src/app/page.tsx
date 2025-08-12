"use client";

// import LiveClasses from "./LiveClasses";
import LiveClassesTrail from "./LiveClassesTrail";
import MiniAnimTitleCard from "./MiniAnimTitleCard";
import Header from "./Header";



export default function Home() {
  return (
    <section
      className="
        w-full min-h-screen bg-[#E8E6DF]
        grid grid-rows-[auto_auto_auto]        /* mob–lg: sve auto, nema praznog prostora */
        xl:grid-rows-[auto_minmax(28vh,40vh)_auto]  /* tek od xl fiksiramo gornju granicu */
      "
    >
      <Header
        membershipImage="/images/Membership-LiveC (1).png"
        activeLinkId="reviews"
        rightTitles={[
          'Weekly Art Club',
          'Semester Long Art Course',
          'Private Programs',
        ]}
      />

      {/* MIDDLE: uklonimo 'prisilnu' visinu i damo malo vertikalnog ritma */}
      <div className="relative overflow-hidden flex items-center justify-center
                py-6 md:py-8 xl:py-0 h-[clamp(180px,32vw,420px)] xl:h-auto">
  <LiveClassesTrail title={'LIVE\nCLASSES'} />
</div>

      {/* BOTTOM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-[clamp(16px,4vw,32px)] lg:gap-8 px-0 sm:px-4 md:px-6 items-stretch">
        <MiniAnimTitleCard
  title={`Weekly\nArt Club`}
  imgSrc="/images/weekly.png"
  mediaAlign="right"
  textNudge={12}
  mediaNudge={12}
  mediaWrapClassName="md:-mr-5"   // gurne kroz padding do ivice
/>

<MiniAnimTitleCard
  title={`Semester Long\nArt Course`}
  imgSrc="/images/portrait.png"
  mediaAlign="right"
  textNudge={24}
  mediaNudge={24}
  mediaWrapClassName="md:-mr-5"
/>
        <MiniAnimTitleCard
          title={`Private\nPrograms`}
          imgSrc="/images/flowers.png"
          reverse
          mediaAlign="left"
          textNudge={12}
          mediaNudge={12}
          className="md:[&_h3]:-mr-3 md:[&_img]:-ml-3"
        />
      </div>
    </section>
  );
}