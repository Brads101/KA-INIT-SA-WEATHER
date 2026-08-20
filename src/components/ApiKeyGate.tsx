import { useState, type ChangeEvent, type FormEvent } from "react";

interface ApiKeyGateProps {
  onSubmit: (key: string) => void;
}

export function ApiKeyGate({ onSubmit }: ApiKeyGateProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <div className="gate">
      <form className="gate__card" onSubmit={handleSubmit}>
        <span className="gate__glyph" aria-hidden="true">
          ☁︎
        </span>
        <h1>Connect your OpenWeather key</h1>
        <p>
          This app calls OpenWeather's current-weather endpoint directly from
          your browser, so it needs your own free API key. Grab one at{" "}
          <a
            href="https://home.openweathermap.org/users/sign_up"
            target="_blank"
            rel="noreferrer"
          >
            openweathermap.org
          </a>{" "}
          — it's free and takes a minute. New keys can take a little while to
          activate.
        </p>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Paste your API key"
          aria-label="OpenWeather API key"
          autoFocus
        />
        <button type="submit" disabled={!value.trim()}>
          Save &amp; continue
        </button>
        <p className="gate__note">
          Stored only in this browser's local storage — never sent anywhere
          but OpenWeather.
        </p>
      </form>
    </div>
  );
}
