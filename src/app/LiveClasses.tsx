"use client";
import Lottie from "lottie-react";
import animationData from '../../public/animations/live-classes.json';

export default function LiveClasses() {
  return (
    <div className="w-full flex justify-center pt-12">
  <div className="w-[1200px] h-[350px] translate-x-[150px]">
    <Lottie animationData={animationData} loop autoplay />
  </div>
</div>
  );
}