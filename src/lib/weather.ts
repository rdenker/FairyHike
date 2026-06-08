const NÜRNBERG_LAT = 49.45;
const NÜRNBERG_LON = 11.08;

interface CuteWeather {
  emoji: string;
  text: string;
  verdict: string;
}

const weatherCuteMap: Record<string, CuteWeather> = {
  clear: {
    emoji: "☀️",
    text: "Strahlend sonnig!",
    verdict: "Die Sonne tanzt nur für uns! Perfekt für Feenflügel 🌟",
  },
  mainlyClear: {
    emoji: "🌤️",
    text: "Meist sonnig",
    verdict: "Ein Hauch von Wolken macht die Aussicht romantischer 🦋",
  },
  partlyCloudy: {
    emoji: "⛅",
    text: "Leicht bewölkt",
    verdict: "Wolken wie Zuckerwatte am Himmel! Immer noch zauberhaft ✨",
  },
  overcast: {
    emoji: "☁️",
    text: "Bedeckt",
    verdict: "Der Himmel kuschelt sich ein... aber wir auch! 🤗",
  },
  foggy: {
    emoji: "🌫️",
    text: "Nebelig",
    verdict: "Geheimnisvoll wie ein verzauberter Feenwald... 🧚‍♀️",
  },
  drizzle: {
    emoji: "🌦️",
    text: "Nieselregen",
    verdict: "Feiner Feenstaub vom Himmel! Ein bisschen Regen belebt die Seele 🌈",
  },
  rain: {
    emoji: "🌧️",
    text: "Regen",
    verdict: "Regenbogen inklusive! Feen tanzen auch im Regen 💚",
  },
  rainHeavy: {
    emoji: "🌧️",
    text: "Starker Regen",
    verdict: "Perfektes Wetter zum Kuscheln unter einem Baum... oder Regenschirm! ☂️",
  },
  snow: {
    emoji: "🌨️",
    text: "Schnee",
    verdict: "Schneeflocken sind gefrorene Feentränen! Eine weisse Winterwunderwelt ❄️",
  },
  showers: {
    emoji: "🌦️",
    text: "Regenschauer",
    verdict: "Kurze Erfrischung, dann wieder zauberhaft! Die Sonne kommt bestimmt 🌤️",
  },
  thunderstorm: {
    emoji: "⛈️",
    text: "Gewitter!",
    verdict: "Dramatische Himmelsshow mit Lichteffekten! Vielleicht gemütlicher drinnen? ⚡",
  },
};

function getCuteWeather(code: number): CuteWeather {
  if (code === 0) return weatherCuteMap.clear;
  if (code === 1) return weatherCuteMap.mainlyClear;
  if (code >= 2 && code <= 3) return weatherCuteMap.partlyCloudy;
  if (code >= 45 && code <= 48) return weatherCuteMap.foggy;
  if (code >= 51 && code <= 57) return weatherCuteMap.drizzle;
  if (code >= 61 && code <= 65) return weatherCuteMap.rain;
  if (code >= 66 && code <= 67) return weatherCuteMap.rainHeavy;
  if (code >= 71 && code <= 77) return weatherCuteMap.snow;
  if (code >= 80 && code <= 82) return weatherCuteMap.showers;
  if (code >= 95 && code <= 99) return weatherCuteMap.thunderstorm;
  return weatherCuteMap.partlyCloudy;
}

function formatSunset(sunsetIso: string): string {
  try {
    const d = new Date(sunsetIso);
    return d.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return sunsetIso;
  }
}

export async function fetchWeather(date: string): Promise<{
  weather: CuteWeather;
  tempMax: number;
  tempMin: number;
  sunset: string;
} | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${NÜRNBERG_LAT}&longitude=${NÜRNBERG_LON}&daily=temperature_2m_max,temperature_2m_min,weathercode,sunset&timezone=Europe/Berlin&start_date=${date}&end_date=${date}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return null;

    const data = await res.json();

    if (!data.daily || !data.daily.time || data.daily.time.length === 0) {
      return null;
    }

    const days: string[] = data.daily.time;
    const index = days.indexOf(date);

    if (index === -1) return null;

    const weatherCode: number = data.daily.weathercode[index];
    const tempMax: number = data.daily.temperature_2m_max[index];
    const tempMin: number = data.daily.temperature_2m_min[index];
    const sunsetIso: string = data.daily.sunset[index];

    return {
      weather: getCuteWeather(weatherCode),
      tempMax,
      tempMin,
      sunset: formatSunset(sunsetIso),
    };
  } catch (e) {
    console.error("Weather fetch error:", e);
    return null;
  }
}
