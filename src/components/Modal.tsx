import { useEffect } from "react";
import type { WeatherSummary } from "../types/api";
import { conditionTheme } from "../utils/weatherTheme";

interface ModalProps {
  entry: WeatherSummary;
  unit: "C" | "F";
  onClose: () => void;
}

function formatTemp(celsius: number, unit: "C" | "F"): number {
  return Math.round(unit === "C" ? celsius : celsius * (9 / 5) + 32);
}

function formatTime(unixSeconds: number): string {
  const date = new Date(unixSeconds * 1000);
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function Modal({ entry, unit, onClose }: ModalProps) {
  const theme = conditionTheme(entry.condition);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        style={{ "--accent": theme.accent } as React.CSSProperties}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={entry.city}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="modal__header">
          <span className="modal__glyph" aria-hidden="true">
            {theme.glyph}
          </span>
          <div>
            <h2>
              {entry.city}, {entry.country}
            </h2>
            <p className="modal__description">{entry.description}</p>
          </div>
        </div>

        <div className="modal__grid">
          <div>
            <span className="modal__label">Temperature</span>
            <span>{formatTemp(entry.tempC, unit)}°</span>
          </div>
          <div>
            <span className="modal__label">Feels like</span>
            <span>{formatTemp(entry.feelsLikeC, unit)}°</span>
          </div>
          <div>
            <span className="modal__label">Humidity</span>
            <span>{entry.humidity}%</span>
          </div>
          <div>
            <span className="modal__label">Wind speed</span>
            <span>{entry.windSpeed} m/s</span>
          </div>
          <div>
            <span className="modal__label">Pressure</span>
            <span>{entry.pressure} hPa</span>
          </div>
          <div>
            <span className="modal__label">
              {entry.isDaytime ? "Sunset" : "Sunrise"}
            </span>
            <span>
              {formatTime(entry.isDaytime ? entry.sunset : entry.sunrise)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
