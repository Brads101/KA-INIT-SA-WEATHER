import type { WeatherGroup } from "../types/api";

export interface ConditionTheme {
  accent: string;
  gradientDay: string;
  gradientNight: string;
  glyph: string;
}

/**
 * Maps OpenWeather's broad condition groups to an accent color, a
 * day/night gradient pair, and a glyph. Drives the hero background,
 * card glow, and badge color throughout the app.
 */
const CONDITION_THEME: Record<WeatherGroup, ConditionTheme> = {
  Clear: {
    accent: "#ffd166",
    gradientDay: "linear-gradient(160deg, #4facfe 0%, #8fd3ff 55%, #ffe9a8 100%)",
    gradientNight: "linear-gradient(160deg, #0b1224 0%, #1b2a4a 60%, #2d3b63 100%)",
    glyph: "☀︎",
  },
  Clouds: {
    accent: "#b8c2cc",
    gradientDay: "linear-gradient(160deg, #7f8c9f 0%, #a8b3c2 55%, #cfd7e0 100%)",
    gradientNight: "linear-gradient(160deg, #1c2230 0%, #333c4f 60%, #4a5468 100%)",
    glyph: "☁︎",
  },
  Rain: {
    accent: "#4fc3f7",
    gradientDay: "linear-gradient(160deg, #3a4b5c 0%, #4f6577 55%, #7d97a8 100%)",
    gradientNight: "linear-gradient(160deg, #0e1620 0%, #1c2b38 60%, #2b3f4f 100%)",
    glyph: "☂︎",
  },
  Drizzle: {
    accent: "#81d4fa",
    gradientDay: "linear-gradient(160deg, #52697a 0%, #6d8494 55%, #9bb2bf 100%)",
    gradientNight: "linear-gradient(160deg, #101823 0%, #202f3c 60%, #33475a 100%)",
    glyph: "☂︎",
  },
  Thunderstorm: {
    accent: "#c4a3ff",
    gradientDay: "linear-gradient(160deg, #2c2740 0%, #40385c 55%, #5b4f7d 100%)",
    gradientNight: "linear-gradient(160deg, #0a0812 0%, #1a1528 60%, #2c2340 100%)",
    glyph: "⚡︎",
  },
  Snow: {
    accent: "#90caf9",
    gradientDay: "linear-gradient(160deg, #dbeafe 0%, #eef4fc 55%, #f8fbff 100%)",
    gradientNight: "linear-gradient(160deg, #1b2536 0%, #2c3a50 60%, #44586e 100%)",
    glyph: "❄︎",
  },
  Mist: {
    accent: "#cfd8dc",
    gradientDay: "linear-gradient(160deg, #9aa5ab 0%, #bcc5ca 55%, #dbe1e4 100%)",
    gradientNight: "linear-gradient(160deg, #1a1e22 0%, #2c3236 60%, #40474c 100%)",
    glyph: "▤",
  },
  Smoke: { accent: "#cfd8dc", gradientDay: "linear-gradient(160deg, #97928c 0%, #b8b3ac 55%, #d8d3cb 100%)", gradientNight: "linear-gradient(160deg, #1c1a17 0%, #302c27 60%, #443f38 100%)", glyph: "▤" },
  Haze: { accent: "#e0c68f", gradientDay: "linear-gradient(160deg, #a89b7d 0%, #c7bb9c 55%, #e8ddc0 100%)", gradientNight: "linear-gradient(160deg, #201c14 0%, #362f22 60%, #4c4230 100%)", glyph: "▤" },
  Dust: { accent: "#d9b878", gradientDay: "linear-gradient(160deg, #ab8f5d 0%, #c9ac7c 55%, #e8cfa2 100%)", gradientNight: "linear-gradient(160deg, #1c1710 0%, #332a1b 60%, #493c28 100%)", glyph: "▤" },
  Fog: { accent: "#cfd8dc", gradientDay: "linear-gradient(160deg, #9aa5ab 0%, #bcc5ca 55%, #dbe1e4 100%)", gradientNight: "linear-gradient(160deg, #1a1e22 0%, #2c3236 60%, #40474c 100%)", glyph: "▤" },
  Sand: { accent: "#d9b878", gradientDay: "linear-gradient(160deg, #ab8f5d 0%, #c9ac7c 55%, #e8cfa2 100%)", gradientNight: "linear-gradient(160deg, #1c1710 0%, #332a1b 60%, #493c28 100%)", glyph: "▤" },
  Ash: { accent: "#b8b0aa", gradientDay: "linear-gradient(160deg, #7a7570 0%, #9c9691 55%, #beb8b2 100%)", gradientNight: "linear-gradient(160deg, #171513 0%, #2a2724 60%, #3c3833 100%)", glyph: "▤" },
  Squall: { accent: "#4fc3f7", gradientDay: "linear-gradient(160deg, #3a4b5c 0%, #4f6577 55%, #7d97a8 100%)", gradientNight: "linear-gradient(160deg, #0e1620 0%, #1c2b38 60%, #2b3f4f 100%)", glyph: "⚡︎" },
  Tornado: { accent: "#c4a3ff", gradientDay: "linear-gradient(160deg, #2c2740 0%, #40385c 55%, #5b4f7d 100%)", gradientNight: "linear-gradient(160deg, #0a0812 0%, #1a1528 60%, #2c2340 100%)", glyph: "⚡︎" },
};

export function conditionTheme(group: WeatherGroup): ConditionTheme {
  return CONDITION_THEME[group] ?? CONDITION_THEME.Clouds;
}
