import Sparkle from "./Sparkle";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderProps = {
  membershipImage: string;
  activeLinkId?: string; // npr. 'reviews'
  rightTitles: string[];
};

export default function Header({
  membershipImage,
  activeLinkId,
  rightTitles,
}: HeaderProps) {
  
  const links = [
    { label: "MY ART ACADEMIA", href: "/" },
    { label: "LIVE CLASSES", href: "/classes" },
    { label: "CREATE ANYTIME", href: "/anytime" },
    { label: "INSIDE OUR STUDIO", href: "/studio" },
    { label: "ART SHOP", href: "/shop" },
    { label: "CONTACT", href: "/contact" },
  ];
  const pathname = usePathname();

  const logoSrc = "/images/MyArtLogo.png";
  const isTopActive = (slug: string) => activeLinkId === slug;
  const baseTopLink =
    "hover:opacity-70 mr-[1vw] max-[600px]:mr-[6px] max-[450px]:mr-[4px] transition-colors";
  const activeTopLink = "text-[var(--header-active)] underline decoration-2 underline-offset-[6px] font-semibold";

  return (
    <section className="h-full w-full bg-[var(--bg)] flex flex-col gap-[clamp(8px,1vw,18px)]">
      {/* Gornji deo + sticker */}
      <div className="relative">
        <div className="w-full h-[6vw] min-h-[56px] bg-[url('/images/border.png')] bg-cover bg-center">
          {/* 40 / 60 */}
          <div className="absolute inset-0 z-20 grid h-full gap-0 grid-cols-[0.4fr_0.6fr]">
            {/* Leva polovina */}
            <div className="flex items-center justify-start pl-[2vw] md:pl-[3vw]">
              <span
                className="inline-flex items-center gap-[0.6ch] font-semibold whitespace-nowrap
                           text-[clamp(16px,1.8vw,26px)]
                           lg:text-[clamp(18px,1.6vw,28px)]
                           max-[1023px]:text-[clamp(12px,1.25vw,18px)]
                           max-[740px]:text-[12px]
                           max-[600px]:text-[11px] max-[600px]:tracking-[-0.01em]
                           max-[500px]:text-[10px]"
              >
                <Sparkle className="h-[0.9em] w-[0.9em] text-[#9F61E1] fill-current" />
                <span>Student log in</span>
              </span>
            </div>

            {/* Desna polovina → 66 / 34 */}
            <div
              className="grid grid-cols-[2fr_1fr] items-center h-full
                         max-[450px]:grid-cols-[2.2fr_0.8fr]"
            >
              {/* NAV */}
              <nav
                className="min-w-0 flex items-center justify-start whitespace-nowrap
                           gap-[clamp(6px,1vw,16px)]
                           text-[clamp(16px,1.7vw,26px)]
                           lg:text-[clamp(18px,1.5vw,24px)]
                           max-[700px]:text-[11px] max-[600px]:gap-[4px]
                           max-[470px]:text-[9px] max-[450px]:gap-[3px] font-semibold"
              >
                <a
                  href="/behind"
                  className={`${baseTopLink} ${
                    isTopActive("behind") ? activeTopLink : ""
                  }`}
                  aria-current={isTopActive("behind") ? "page" : undefined}
                >
                  Behind the Scenes
                </a>

                <a
                  href="/reviews"
                  className={`${baseTopLink} ${
                    isTopActive("reviews") ? activeTopLink : ""
                  }`}
                  aria-current={isTopActive("reviews") ? "page" : undefined}
                >
                  Reviews
                </a>

                <a
                  href="/faq"
                  className={`${baseTopLink} ${
                    isTopActive("faq") ? activeTopLink : ""
                  }`}
                  aria-current={isTopActive("faq") ? "page" : undefined}
                >
                  FAQ
                </a>
              </nav>

              {/* MEMBERSHIP */}
              <div className="min-w-0 flex items-center justify-end pr-[4vw] max-[600px]:pr-[1.2vw]">
                <a
                  href="/membership"
                  className="tracking-tight whitespace-nowrap font-semibold
                             text-[clamp(15px,1.7vw,24px)]
                             lg:text-[clamp(17px,1.5vw,24px)]
                             max-[600px]:text-[11px]
                             max-[450px]:text-[10px]"
                >
                  <Sparkle className="h-[0.9em] w-[0.9em] text-[#9F61E1] fill-current" />
                  MEMBERSHIP
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sticker */}
        <img
          src={membershipImage}
          alt="Membership"
          className="absolute top-0 right-0 z-10 h-[6vw] min-h-[48px] object-contain pointer-events-none hidden lg:block"
        />
      </div>

      {/* Donji deo */}
      <div className="grid grid-cols-3 items-start px-[5%] mt-[clamp(8px,2.5vw,30px)]">
        {/* Levi: linkovi */}
        <nav
          className="flex flex-col gap-1
                     text-[clamp(20px,2.8vw,36px)]
                     font-bold leading-[0.95] max-[700px]:text-[12px]"
        >
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={active ? "text-[#9F61E1]" : "hover:text-[#9F61E1]"}
              >
                {l.label}
              </Link>
            );
          })}
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
