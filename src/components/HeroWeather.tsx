import type { WeatherSummary } from "../types/api";
import { conditionTheme } from "../utils/weatherTheme";

interface HeroWeatherProps {
  entry: WeatherSummary;
  unit: "C" | "F";
  onToggleUnit: () => void;
  onViewDetails: () => void;
}

function formatTemp(celsius: number, unit: "C" | "F"): number {
  return Math.round(unit === "C" ? celsius : celsius * (9 / 5) + 32);
}

export function HeroWeather({
  entry,
  unit,
  onToggleUnit,
  onViewDetails,
}: HeroWeatherProps) {
  const theme = conditionTheme(entry.condition);

  return (
    <section className="hero" style={{ "--accent": theme.accent } as React.CSSProperties}>
      <div className="hero__top">
        <div>
          <p className="hero__location">
            {entry.city}, {entry.country}
          </p>
          <p className="hero__condition">{entry.description}</p>
        </div>
        <span className="hero__glyph" aria-hidden="true">
          {theme.glyph}
        </span>
      </div>

      <div className="hero__temp-row">
        <span className="hero__temp">{formatTemp(entry.tempC, unit)}°</span>
        <button
          className="hero__unit-toggle"
          onClick={onToggleUnit}
          aria-label="Toggle temperature unit"
        >
          <span className={unit === "C" ? "is-active" : ""}>°C</span>
          <span className="hero__unit-divider">/</span>
          <span className={unit === "F" ? "is-active" : ""}>°F</span>
        </button>
      </div>

      <p className="hero__feels-like">
        Feels like {formatTemp(entry.feelsLikeC, unit)}° · H{" "}
        {formatTemp(entry.tempMaxC, unit)}° L {formatTemp(entry.tempMinC, unit)}°
      </p>

      <button className="hero__details-button" onClick={onViewDetails}>
        View details
      </button>
    </section>
  );
}
