import type { ReactNode } from "react";
import type { WeatherSummary } from "../types/api";
import { conditionTheme } from "../utils/weatherTheme";

interface CardProps {
  entry: WeatherSummary;
  isActive: boolean;
  unit: "C" | "F";
  onSelect: (entry: WeatherSummary) => void;
  onRemove: (id: number) => void;
  /** Optional slot for extra content rendered below the temperature. */
  children?: ReactNode;
}

function formatTemp(celsius: number, unit: "C" | "F"): string {
  const value = unit === "C" ? celsius : celsius * (9 / 5) + 32;
  return `${Math.round(value)}°`;
}

export function Card({
  entry,
  isActive,
  unit,
  onSelect,
  onRemove,
  children,
}: CardProps) {
  const theme = conditionTheme(entry.condition);

  return (
    <article
      className={`card ${isActive ? "card--active" : ""}`}
      style={{ "--accent": theme.accent } as React.CSSProperties}
      onClick={() => onSelect(entry)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(entry);
      }}
    >
      <button
        className="card__remove"
        aria-label={`Remove ${entry.city}`}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(entry.id);
        }}
      >
        ✕
      </button>

      <span className="card__glyph" aria-hidden="true">
        {theme.glyph}
      </span>

      <h3 className="card__city">{entry.city}</h3>
      <span className="card__country">{entry.country}</span>

      <span className="card__temp">{formatTemp(entry.tempC, unit)}</span>
      <span className="card__description">{entry.description}</span>

      {children}
    </article>
  );
}
