import Sparkle from "./Sparkle";

type HeaderProps = {
  membershipImage: string;
  activeLinkId?: string;
  rightTitles: string[];
};

export default function Header({
  membershipImage,
  activeLinkId,
  rightTitles,
}: HeaderProps) {
  // Ovo je stalno isto za sve stranice
  const links = [
    { id: "academia", label: "MY ART ACADEMIA", href: "/academia" },
    { id: "classes", label: "LIVE CLASSES", href: "/classes" },
    { id: "anytime", label: "CREATE ANYTIME", href: "/anytime" },
    { id: "studio", label: "INSIDE OUR STUDIO", href: "/studio" },
    { id: "shop", label: "ART SHOP", href: "/shop" },
    { id: "contact", label: "CONTACT", href: "/contact" },
  ];

  const logoSrc = "/images/MyArtLogo.png";

  return (
    <section className="h-full w-full bg-[#E8E6DF] flex flex-col gap-[clamp(8px,1vw,18px)]">
      {/* Gornji deo */}
     <div className="relative w-full h-[6vw] min-h-[56px]
                bg-[url('/images/border.png')] bg-cover bg-center">

  {/* 40 / 60 (radi do 380) */}
  <div className="absolute inset-0 z-20 grid h-full gap-0 grid-cols-[0.4fr_0.6fr]">
    {/* Leva polovina */}
    <div className="flex items-center justify-start pl-[2vw] md:pl-[3vw]">
  <span className="inline-flex items-center gap-[0.6ch] font-semibold whitespace-nowrap
                   text-[clamp(16px,1.8vw,26px)]
                   max-[1023px]:text-[clamp(12px,1.25vw,18px)]
                   max-[740px]:text-[12px]
                   max-[600px]:text-[11px] max-[600px]:tracking-[-0.01em]
                   max-[500px]:text-[10px]">
    <Sparkle className="h-[0.9em] w-[0.9em] text-[#9F61E1] fill-current" />
    <span>Student log in</span>
  </span>
</div>

    {/* Desna polovina → 66 / 34 */}
    <div className="grid grid-cols-[2fr_1fr] items-center h-full
                max-[450px]:grid-cols-[2.2fr_0.8fr]  /* malo više prostora za nav */
">
  {/* NAV */}
  <nav className="min-w-0 flex items-center justify-start whitespace-nowrap
                  gap-[clamp(6px,1vw,16px)]
                  text-[clamp(16px,1.8vw,26px)]
                  max-[700px]:text-[11px] max-[600px]:gap-[4px]
                  max-[470px]:text-[9px] max-[450px]:gap-[3px] font-semibold">
    <a href="/behind"  className="hover:opacity-70 mr-[1vw]
                       max-[600px]:mr-[6px] max-[450px]:mr-[4px]">
      Behind the Scenes
    </a>
    <a href="/reviews" className="hover:opacity-70 mr-[1vw]">Reviews</a>
    <a href="/faq"     className="hover:opacity-70 mr-[1vw]">FAQ</a>
  </nav>

  {/* MEMBERSHIP */}
  <div className="min-w-0 flex items-center justify-end pr-[4vw]
                  max-[600px]:pr-[1.2vw]">
    <a href="/membership"
       className="tracking-tight whitespace-nowrap font-semibold
                  text-[clamp(15px,1.7vw,24px)]
                  max-[600px]:text-[11px]
                  max-[450px]:text-[10px]">
                    <Sparkle className="h-[0.9em] w-[0.9em] text-[#9F61E1] fill-current" />
      MEMBERSHIP
    </a>
  </div>
</div>
  </div>

  {/* Sticker – ostaje isto, skriven <1024 da ne smeta */}
  <img
    src="/images/Membership-LiveC (1).png"
    alt="Membership"
    className="absolute top-0 right-0 z-10 h-[6vw] min-h-[48px] object-contain pointer-events-none hidden lg:block"
  />
</div>

      {/* Donji deo */}
      <div className="grid grid-cols-3 items-start px-[5%]  mt-[clamp(8px,2.5vw,30px)]">
        {/* Levi: linkovi */}
        <nav
          className="flex flex-col gap-1 
                text-[clamp(20px,2.8vw,36px)] 
                font-bold leading-[0.95] 
                "
        >
          {links.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className={`hover:opacity-70 ${
                activeLinkId === l.id ? "font-semibold underline" : ""
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Srednji: logo */}
        <div className="flex justify-center">
          <img
            src={logoSrc}
            alt="Logo"
            className="h-[5.6vw] min-h-[28px] object-contain"
          />
        </div>

        {/* Desni: naslovi */}
        <div className="flex flex-col items-end text-right text-[clamp(14px,1.5vw,26px)] gap-[2px] font-semibold">
          {rightTitles.map((t) => (
            <span key={t} className="tracking-tight">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
