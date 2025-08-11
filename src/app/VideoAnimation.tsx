export default function VideoAnimtaion() {
  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-black">
  <video
    autoPlay
    muted
    playsInline
    className="max-w-full max-h-full z-10"
    onEnded={(e) => {
      const v = e.currentTarget;
      // „zamrzni“ poslednji frejm
      v.currentTime = Math.max(0, v.duration - 0.05);
      v.pause();
    }}
    preload="auto"
  >
    <source src="/animations/1girl.webm" type="video/webm" />
  </video>
</div>
  );
}
