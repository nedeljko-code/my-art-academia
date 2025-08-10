"use client";

// import LiveClasses from "./LiveClasses";
import LiveClassesTrail from "./LiveClassesTrail";
import VideoAnimtaion from "./VideoAnimation";
import Header from "./Header";

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
        {/* <VideoAnimtaion /> */}
        <LiveClassesTrail title={"LIVE\nCLASSES"} />
      </div>

      {/* BOTTOM (30vh) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-6 items-start">
        <div className="border border-black/10 p-4">Card 1</div>
        <div className="border border-black/10 p-4">Card 2</div>
        <div className="border border-black/10 p-4">Card 3</div>
      </div>
    </section>
  );
}