import { useState, type ChangeEvent, type FormEvent } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <span className="search-bar__icon" aria-hidden="true">
        ⌕
      </span>
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search a city — e.g. Davao City, Tokyo, Lisbon…"
        value={value}
        onChange={handleChange}
        aria-label="Search for a city"
      />
      <button
        type="submit"
        className="search-bar__button"
        disabled={isLoading || !value.trim()}
      >
        {isLoading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}
