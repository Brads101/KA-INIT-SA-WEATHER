import { useReducer, useCallback } from "react";
import type { WeatherResponse, WeatherSummary } from "../types/api";

export function toSummary(raw: WeatherResponse): WeatherSummary {
  const condition = raw.weather[0];
  const nowUtc = raw.dt;
  return {
    id: raw.id,
    city: raw.name,
    country: raw.sys.country,
    tempC: raw.main.temp,
    feelsLikeC: raw.main.feels_like,
    tempMinC: raw.main.temp_min,
    tempMaxC: raw.main.temp_max,
    humidity: raw.main.humidity,
    pressure: raw.main.pressure,
    windSpeed: raw.wind.speed,
    condition: condition?.main ?? "Clouds",
    description: condition?.description ?? "",
    icon: condition?.icon ?? "01d",
    sunrise: raw.sys.sunrise,
    sunset: raw.sys.sunset,
    observedAt: nowUtc,
    isDaytime: nowUtc >= raw.sys.sunrise && nowUtc < raw.sys.sunset,
  };
}

interface State {
  entries: WeatherSummary[];
  activeId: number | null;
}

type Action =
  | { type: "ADD_ENTRY"; payload: WeatherSummary }
  | { type: "REMOVE_ENTRY"; payload: number }
  | { type: "SELECT_ENTRY"; payload: number | null };

const MAX_HISTORY = 8;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ENTRY": {
      const withoutDuplicate = state.entries.filter(
        (e) => e.id !== action.payload.id,
      );
      const entries = [action.payload, ...withoutDuplicate].slice(
        0,
        MAX_HISTORY,
      );
      return { entries, activeId: action.payload.id };
    }
    case "REMOVE_ENTRY": {
      const entries = state.entries.filter((e) => e.id !== action.payload);
      const activeId =
        state.activeId === action.payload
          ? (entries[0]?.id ?? null)
          : state.activeId;
      return { entries, activeId };
    }
    case "SELECT_ENTRY":
      return { ...state, activeId: action.payload };
    default:
      return state;
  }
}

/**
 * Owns the list of previously-searched cities. Kept separate from the
 * fetch itself (see `useFetch`) so search results can be added here
 * once resolved, and re-selected from history without refetching.
 */
export function useWeatherHistory(initial: WeatherSummary[] = []) {
  const [state, dispatch] = useReducer(reducer, {
    entries: initial,
    activeId: initial[0]?.id ?? null,
  });

  const addEntry = useCallback((entry: WeatherSummary) => {
    dispatch({ type: "ADD_ENTRY", payload: entry });
  }, []);

  const removeEntry = useCallback((id: number) => {
    dispatch({ type: "REMOVE_ENTRY", payload: id });
  }, []);

  const selectEntry = useCallback((id: number | null) => {
    dispatch({ type: "SELECT_ENTRY", payload: id });
  }, []);

  const active =
    state.entries.find((e) => e.id === state.activeId) ?? state.entries[0] ?? null;

  return {
    entries: state.entries,
    active,
    addEntry,
    removeEntry,
    selectEntry,
  };
}
