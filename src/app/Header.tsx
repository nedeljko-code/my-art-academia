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
    <section className="h-full w-full bg-[#efeeee] flex flex-col gap-[clamp(8px,1vw,18px)]">
      {/* Gornji deo */}
      <div
        className="relative h-[5vw] min-h-[40px] shrink-0
               bg-[url('/images/border2.png')]
               bg-cover bg-center
               drop-shadow-[0_10px_12px_rgba(0,0,0,0.4)]"
      >
        {/* Grid: leva polovina + desna polovina */}
        <div className="absolute inset-0 grid grid-cols-2 items-center px-4 md:px-6 ">
          {/* Leva polovina: Student log in */}
          <div className="flex items-center">
            <span className="text-[clamp(20px,3.5vw,42px)] pl-[6vw] font-semibold">
              Student log in
            </span>
          </div>

          {/* Desna polovina: (2/3) links + (1/3) MEMBERSHIP */}
          <div className="grid grid-cols-3 items-center">
            {/* 2/3: Behind / Reviews / FAQ */}
            <nav className="col-span-2 flex justify-center text-[clamp(20px,3.5vw,42px)] font-semibold">
              <a href="/behind" className="hover:opacity-70 mr-[2.5vw]">
                Behind the Scenes
              </a>
              <div className="flex gap-[1.5vw]">
                <a href="/reviews" className="hover:opacity-70">
                  Reviews
                </a>
                <a href="/faq" className="hover:opacity-70">
                  FAQ
                </a>
              </div>
            </nav>

            {/* 1/3: MEMBERSHIP (caps) */}
            <div className="flex justify-end z-20">
              <a
                href="/membership"
                className="tracking-wide text-[clamp(20px,3.5vw,42px)] font-semibold"
              >
                MEMBERSHIP
              </a>
            </div>
          </div>
        </div>

        {/* (opciono) kartica/PNG ispod MEMBERSHIP teksta */}
        <div className="absolute right-0 top-0 z-10">
          <img
            src="/images/Membership-LiveC (1).png"
            alt="Membership"
            className="h-[6vw] min-h-[48px] object-contain"
          />
        </div>
      </div>

      {/* Donji deo */}
      <div className="grid grid-cols-3 items-start px-[5%] pt-[clamp(6px,1.2vw,18px)] mt-[clamp(8px,2.5vw,30px)]">
        {/* Levi: linkovi */}
        <nav
          className="flex flex-col gap-1 
                text-[clamp(20px,2.8vw,44px)] 
                font-bold leading-[0.95] 
                -translate-y-[6%] md:-translate-y-[8%]"
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
