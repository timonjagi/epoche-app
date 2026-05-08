import { ZodiacSign } from "@/constants/theme";

export function calculateSunSign(month: number, day: number): ZodiacSign {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "aquarius";
  return "pisces";
}

export function calculateMoonPhase(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let c = 0,
    e = 0;
  if (month < 3) {
    c = 365.25 * (year - 1);
    e = 30.6 * (month + 13);
  } else {
    c = 365.25 * year;
    e = 30.6 * (month + 1);
  }

  const jd = c + e + day - 694039.09;
  const phase = jd / 29.5305882;
  const currentPhase = phase - Math.floor(phase);

  return currentPhase;
}

export function getMoonPhaseName(phase: number): string {
  if (phase < 0.0625) return "newMoon";
  if (phase < 0.1875) return "waxingCrescent";
  if (phase < 0.3125) return "firstQuarter";
  if (phase < 0.4375) return "waxingGibbous";
  if (phase < 0.5625) return "fullMoon";
  if (phase < 0.6875) return "waningGibbous";
  if (phase < 0.8125) return "lastQuarter";
  if (phase < 0.9375) return "waningCrescent";
  return "newMoon";
}

export function calculateSacredSecretionWindow(
  birthDate: Date,
  currentDate: Date = new Date()
): { start: Date; peak: Date; end: Date } | null {
  const sunPosition = getSunLongitude(birthDate);
  if (sunPosition === null) return null;

  const moonPhaseCycle = 29.5305882;
  const moonCycleOffset = (sunPosition / 360) * moonPhaseCycle;

  const daysSinceBirth =
    (currentDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24);
  const currentMoonCycle = Math.floor(daysSinceBirth / moonPhaseCycle);
  const nextConjunctionDay = (currentMoonCycle + 1) * moonPhaseCycle + moonCycleOffset;

  const peakDate = new Date(
    birthDate.getTime() + nextConjunctionDay * 24 * 60 * 60 * 1000
  );

  if (peakDate < currentDate) {
    const nextCycleDay = (currentMoonCycle + 2) * moonPhaseCycle + moonCycleOffset;
    const nextPeak = new Date(
      birthDate.getTime() + nextCycleDay * 24 * 60 * 60 * 1000
    );
    return {
      start: new Date(nextPeak.getTime() - 24 * 60 * 60 * 1000),
      peak: nextPeak,
      end: new Date(nextPeak.getTime() + 24 * 60 * 60 * 1000),
    };
  }

  return {
    start: new Date(peakDate.getTime() - 24 * 60 * 60 * 1000),
    peak: peakDate,
    end: new Date(peakDate.getTime() + 24 * 60 * 60 * 1000),
  };
}

function getSunLongitude(date: Date): number {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return ((dayOfYear / 365) * 360) % 360;
}