# Skyline — Vite + TypeScript + React Weather Dashboard

A single-page weather dashboard that fetches live conditions from [OpenWeather](https://openweathermap.org) and presents them as an atmospheric, animated UI: a full-bleed sky gradient that shifts with the current city's condition and time of day, a glass-panel hero readout, and a searchable history of past lookups.

## Features

- **Live data** from OpenWeather's current-weather endpoint, by city name
- **Search** any city, added to a persistent history (max 8, most recent first)
- **Detail modal** with humidity, wind, pressure, and sunrise/sunset
- **°C / °F toggle**, converted client-side
- **Dark / light** UI theme toggle, persisted to `localStorage`
- **Dynamic sky gradient** — background color and glyph shift per weather condition (clear, cloudy, rain, snow, thunderstorm…) and day/night
- History persisted to `localStorage`; your API key is too (stored only in your browser)
- Fully responsive, glass-morphism card grid with hover glow and lift
- Zero TypeScript errors in strict mode

## Tech stack

| Layer      | Choice                                       |
| ---------- | --------------------------------------------- |
| Bundler    | Vite                                           |
| Language   | TypeScript (strict mode)                       |
| UI library | React 19 (function components + hooks)         |
| Styling    | Plain CSS with CSS custom properties           |
| API        | [OpenWeather](https://openweathermap.org/current) current-weather endpoint |

## Project structure

```
src/
├── components/
│   ├── Card.tsx          # Typed props with children, per-condition accent
│   ├── ItemList.tsx      # Renders the history grid via a typed .map()
│   ├── SearchBar.tsx     # Controlled input, typed form/change events
│   ├── HeroWeather.tsx   # Large "current conditions" readout
│   ├── Modal.tsx         # Detail view: humidity, wind, pressure, sun times
│   ├── ApiKeyGate.tsx    # First-run screen for entering your OpenWeather key
│   └── ThemeToggle.tsx   # Reads/writes ThemeContext
├── hooks/
│   ├── useFetch.ts          # Generic hook, discriminated-union fetch state
│   ├── useWeatherHistory.ts # useReducer-driven search history
│   └── useLocalStorage.ts   # Generic localStorage-backed state
├── contexts/
│   └── ThemeContext.tsx  # Light/dark theme via Context + useLocalStorage
├── types/
│   └── api.ts             # Interfaces for OpenWeather response shapes
├── utils/
│   └── weatherTheme.ts     # Condition → gradient/accent/glyph lookup
├── App.tsx                # Root composition
├── App.css                # Design tokens + responsive styling
└── main.tsx                # Entry point
```

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`). On first load you'll be asked for a free **OpenWeather API key** — grab one at [openweathermap.org/users/sign_up](https://home.openweathermap.org/users/sign_up) (new keys can take a little while to activate). The key is stored only in your browser's `localStorage` and sent only to OpenWeather.

### Other scripts

```bash
npm run build       # type-check (tsc -b) + production build
npm run preview     # preview the production build locally
npm run lint         # oxlint
npx tsc --noEmit     # type-check only, no output — should report zero errors
```

## API source

All data comes from OpenWeather's current-weather endpoint (requires a free API key):

```
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={key}&units=metric
```

## Notes on state management

- **`useReducer`** (`useWeatherHistory.ts`) owns the searched-city history: add, remove, and select transitions, capped at 8 entries.
- **`useContext`** (`ThemeContext.tsx`) owns the light/dark UI theme, shared across the header toggle and CSS variables.
- **`useFetch<T>`** is a small generic hook returning a discriminated union (`idle | loading | success | error`), used for the live OpenWeather request.

## License

For educational use.
