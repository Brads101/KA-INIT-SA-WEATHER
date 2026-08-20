import { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { SearchBar } from "./components/SearchBar";
import { ItemList } from "./components/ItemList";
import { HeroWeather } from "./components/HeroWeather";
import { Modal } from "./components/Modal";
import { ApiKeyGate } from "./components/ApiKeyGate";
import { useFetch } from "./hooks/useFetch";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useWeatherHistory, toSummary } from "./hooks/useWeatherHistory";
import type { WeatherResponse, WeatherSummary } from "./types/api";
import { conditionTheme } from "./utils/weatherTheme";
import "./App.css";

function AppShell() {
  const [apiKey, setApiKey] = useLocalStorage<string | null>("wx-api-key", null);
  const [storedEntries, setStoredEntries] = useLocalStorage<WeatherSummary[]>(
    "wx-history",
    [],
  );
  const [unit, setUnit] = useLocalStorage<"C" | "F">("wx-unit", "C");
  const [query, setQuery] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const { entries, active, addEntry, removeEntry, selectEntry } =
    useWeatherHistory(storedEntries);

  useEffect(() => {
    setStoredEntries(entries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);

  const url =
    query && apiKey
      ? `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          query,
        )}&appid=${apiKey}&units=metric`
      : null;

  const fetchState = useFetch<WeatherResponse>(url);
  const isInvalidApiKey =
    fetchState.status === "error" &&
    (fetchState.error.includes("Invalid API key") ||
      fetchState.error.includes("Invalid API Key"));

  useEffect(() => {
    if (fetchState.status === "success") {
      addEntry(toSummary(fetchState.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchState]);

  if (!apiKey) {
    return <ApiKeyGate onSubmit={setApiKey} />;
  }

  const theme = active
    ? conditionTheme(active.condition)
    : { gradientDay: "linear-gradient(160deg,#4facfe,#8fd3ff,#ffe9a8)", gradientNight: "linear-gradient(160deg,#0b1224,#1b2a4a,#2d3b63)" };
  const backgroundGradient = active?.isDaytime === false ? theme.gradientNight : theme.gradientDay;

  return (
    <div className="app" style={{ "--sky": backgroundGradient } as React.CSSProperties}>
      <header className="app__header">
        <div className="app__brand">
          <span className="app__brand-dot" aria-hidden="true" />
          <h1>Samson Weather Updates</h1>
        </div>
        <div className="app__header-actions">
          <button
            className="app__key-reset"
            onClick={() => setApiKey(null)}
            title="Change API key"
          >
            key
          </button>
          <ThemeToggle />
        </div>
      </header>

      <p className="app__subtitle">Live conditions from OpenWeather</p>

      <SearchBar
        onSearch={(city) => setQuery(city)}
        isLoading   ={fetchState.status === "loading"}
      />

      {fetchState.status === "error" && (
        <div className="banner banner--error" role="alert">
          {isInvalidApiKey ? (
            <>
              Your OpenWeather API key is invalid or still activating. Check
              the key and try again.
              <button
                type="button"
                className="app__key-reset"
                onClick={() => setApiKey(null)}
              >
                Change API key
              </button>
            </>
          ) : (
            <>Couldn't find that city: {fetchState.error}</>
          )}
        </div>
      )}

      {active ? (
        <HeroWeather
          entry={active}
          unit={unit}
          onToggleUnit={() => setUnit((u) => (u === "C" ? "F" : "C"))}
          onViewDetails={() => setShowDetails(true)}
        />
      ) : (
        fetchState.status !== "loading" && (
          <div className="empty-state empty-state--hero">
            <p>Search for a city to see the current conditions.</p>
          </div>
        )
      )}

      <h2 className="app__section-title">History</h2>

      <ItemList
        items={entries}
        activeId={active?.id ?? null}
        unit={unit}
        onSelect={(entry) => selectEntry(entry.id)}
        onRemove={removeEntry}
      />

      {showDetails && active && (
        <Modal entry={active} unit={unit} onClose={() => setShowDetails(false)} />
      )}

      <footer className="app__footer">
        ANG BUHAY AY WEATHER WEATHER LANGS! 
        <a href="https://openweathermap.org" target="_blank" rel="noreferrer">
          OpenWeather
        </a>
        .
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}

export default App;
