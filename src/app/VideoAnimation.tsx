export default function VideoAnimtaion() {
  return (
    <div className="relative w-full h-full">
      <video
  autoPlay
  muted
  
  playsInline
  className="absolute w-full h-full border-4 border-red-500"
>
        <source src="/animations/3.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}