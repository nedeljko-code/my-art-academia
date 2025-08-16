export type ProgramSection = {
  id: string;                 // anchor, npr. "kids-5-10"
  title: string;              // "Sketchbook Club"
  subtitle?: string;          // "Kids 5–10"
  image: string;              // "/images/programs/weekly/kids.png"
  blurb: string;              // 2–4 rečenice
  ctaText?: string;           // "Enroll" / "Join waitlist"
  status?: "open" | "waitlist" | "coming-soon";
};

export type ProgramPage = {
  slug: string;               // "weekly-art-club"
  status?: "active" | "coming-soon";
  hero: {
    title: string;            // H1
    lead: string[];           // svaka stavka = jedan red/paragraph
    image?: string;           // vaza (ako je ima)
    decorations?: string[];   // imena SVG ukrasa (opciono)
  };
  sections: ProgramSection[]; // kartice na toj strani
  seo?: { title?: string; description?: string; ogImage?: string };
};

export const PROGRAMS_BY_SLUG: Record<string, ProgramPage> = {
  "weekly-art-club": {
    slug: "weekly-art-club",
    status: "active",
    hero: {
      title: "Weekly Art Club",
      lead: [
        "Meet weekly to draw, share, learn and improve.",
        "Join at any time; pause or stop your weekly subscription.",
        "Flexible, engaging, process-focused to keep creativity going.",
        "One class – one art piece."
      ],
      image: "/images/flowers.png",          // promeni ako treba
      decorations: ["live-star-1", "live-swoosh-1"] // opcionalno
    },
    sections: [
      {
        id: "kids-5-10",
        title: "Sketchbook Club",
        subtitle: "Kids 5–10",
        image: "/images/programs/weekly/kids.png",
        blurb:
          "Intro drawing training with a focus on observation, design basics and playful creation. Build confidence and keep sketching fun.",
        ctaText: "Enroll",
        status: "open"
      },
      {
        id: "teens-anime",
        title: "Sketchbook Anime Club",
        subtitle: "Teens 11–18",
        image: "/images/programs/weekly/teens-anime.png",
        blurb:
          "Anime-focused linework, faces and dynamic poses. Practice character design, inking and color – from quick studies to finished pages.",
        ctaText: "Enroll",
        status: "open"
      },
      {
        id: "teens-realism",
        title: "Sketchbook Realism Club",
        subtitle: "Teens 11–18",
        image: "/images/programs/weekly/teens-realism.png",
        blurb:
          "Realistic drawing fundamentals: proportion, light & shadow, and materials. Step-by-step projects to develop technique and patience.",
        ctaText: "Enroll",
        status: "open"
      }
    ],
    seo: {
      title: "Weekly Art Club – My Art Academia",
      description:
        "Weekly drawing clubs for kids and teens. Join anytime, flexible subscription, one class – one finished art piece."
    }
  }
};

export const PROGRAM_SLUGS = Object.keys(PROGRAMS_BY_SLUG);