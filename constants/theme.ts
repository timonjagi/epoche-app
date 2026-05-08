export const colors = {
  cosmicIndigo: "#1A0B2E",
  lighterIndigo: "#2D1B4E",
  sacredGold: "#D4AF37",
  deepDark: "#0F0A1A",
  warmOffWhite: "#F5F5DC",
  mutedGold: "#B8860B",
  earthyGreen: "#4A5D23",
  saddleBrown: "#8B4513",
  deepBurgundy: "#8B0000",
  pureGold: "#FFD700",
  white: "#FFFFFF",
  gray: {
    100: "#F5F5F5",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
} as const;

export const fonts = {
  display: "PlayfairDisplay",
  body: "Inter",
  mono: "JetBrainsMono",
} as const;

export type TransitType =
  | "sacred_secretion"
  | "saturn_return"
  | "jupiter_return"
  | "mercury_retrograde"
  | "solar_eclipse"
  | "lunar_eclipse"
  | "full_moon"
  | "new_moon"
  | "venus_return"
  | "mars_return";

export const TRANSIT_LABELS: Record<TransitType, string> = {
  sacred_secretion: "Sacred Secretion",
  saturn_return: "Saturn Return",
  jupiter_return: "Jupiter Return",
  mercury_retrograde: "Mercury Retrograde",
  solar_eclipse: "Solar Eclipse",
  lunar_eclipse: "Lunar Eclipse",
  full_moon: "Full Moon",
  new_moon: "New Moon",
  venus_return: "Venus Return",
  mars_return: "Mars Return",
};

export const TRANSIT_DESCRIPTIONS: Record<TransitType, string> = {
  sacred_secretion:
    "A 3-day window when the Moon transits your natal Sun position, opening a portal for spiritual renewal.",
  saturn_return:
    "Saturn completes its orbit and returns to the position it occupied at your birth, marking major life chapters.",
  jupiter_return:
    "Jupiter returns to its natal position, bringing expansion, opportunity, and growth every ~12 years.",
  mercury_retrograde:
    "Mercury appears to move backward, disrupting communication, technology, and travel — a time for reflection.",
  solar_eclipse:
    "A solar eclipse near your natal planets signals powerful new beginnings andCourse corrections.",
  lunar_eclipse:
    "A lunar eclipse near your natal planets brings emotional revelations and completions.",
  full_moon: "Full Moon illuminates what was hidden, bringing culmination and harvest.",
  new_moon: "New Moon offers a blank slate for intentions and new cycles.",
  venus_return:
    "Venus returns to its natal position, activating themes of love, values, and self-worth.",
  mars_return:
    "Mars returns to its natal position, igniting drive, ambition, and physical energy.",
};

export type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export type Element = "fire" | "earth" | "air" | "water";
export type Quality = "cardinal" | "fixed" | "mutable";

export const ZODIAC_SIGNS: Record<
  ZodiacSign,
  {
    symbol: string;
    dates: string;
    element: Element;
    quality: Quality;
    ruler: string;
    keywords: string[];
  }
> = {
  aries: {
    symbol: "♈",
    dates: "Mar 21 – Apr 19",
    element: "fire",
    quality: "cardinal",
    ruler: "Mars",
    keywords: ["bold", "pioneering", "courageous", "impulsive"],
  },
  taurus: {
    symbol: "♉",
    dates: "Apr 20 – May 20",
    element: "earth",
    quality: "fixed",
    ruler: "Venus",
    keywords: ["steadfast", "sensual", "reliable", "determined"],
  },
  gemini: {
    symbol: "♊",
    dates: "May 21 – Jun 20",
    element: "air",
    quality: "mutable",
    ruler: "Mercury",
    keywords: ["versatile", "curious", "communicative", "adaptable"],
  },
  cancer: {
    symbol: "♋",
    dates: "Jun 21 – Jul 22",
    element: "water",
    quality: "cardinal",
    ruler: "Moon",
    keywords: ["intuitive", "nurturing", "protective", "emotional"],
  },
  leo: {
    symbol: "♌",
    dates: "Jul 23 – Aug 22",
    element: "fire",
    quality: "fixed",
    ruler: "Sun",
    keywords: ["radiant", "generous", "creative", "magnanimous"],
  },
  virgo: {
    symbol: "♍",
    dates: "Aug 23 – Sep 22",
    element: "earth",
    quality: "mutable",
    ruler: "Mercury",
    keywords: ["analytical", "devoted", "practical", "meticulous"],
  },
  libra: {
    symbol: "♎",
    dates: "Sep 23 – Oct 22",
    element: "air",
    quality: "cardinal",
    ruler: "Venus",
    keywords: ["diplomatic", "harmonious", "fair-minded", "refined"],
  },
  scorpio: {
    symbol: "♏",
    dates: "Oct 23 – Nov 21",
    element: "water",
    quality: "fixed",
    ruler: "Pluto",
    keywords: ["intense", "transformative", "perceptive", "resolute"],
  },
  sagittarius: {
    symbol: "♐",
    dates: "Nov 22 – Dec 21",
    element: "fire",
    quality: "mutable",
    ruler: "Jupiter",
    keywords: ["adventurous", "philosophical", "optimistic", "expansive"],
  },
  capricorn: {
    symbol: "♑",
    dates: "Dec 22 – Jan 19",
    element: "earth",
    quality: "cardinal",
    ruler: "Saturn",
    keywords: ["disciplined", "ambitious", "responsible", "strategic"],
  },
  aquarius: {
    symbol: "♒",
    dates: "Jan 20 – Feb 18",
    element: "air",
    quality: "fixed",
    ruler: "Uranus",
    keywords: ["innovative", "humanitarian", "independent", "visionary"],
  },
  pisces: {
    symbol: "♓",
    dates: "Feb 19 – Mar 20",
    element: "water",
    quality: "mutable",
    ruler: "Neptune",
    keywords: ["empathic", "mystical", "compassionate", "imaginative"],
  },
};

export const MOON_PHASES = [
  "newMoon",
  "waxingCrescent",
  "firstQuarter",
  "waxingGibbous",
  "fullMoon",
  "waningGibbous",
  "lastQuarter",
  "waningCrescent",
] as const;

export type MoonPhase = (typeof MOON_PHASES)[number];