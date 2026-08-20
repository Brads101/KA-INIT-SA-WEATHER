import { useEffect, useState } from "react";

/**
 * Generic state hook backed by localStorage. Behaves like `useState`,
 * but persists the value under `key` and hydrates from it on mount.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can fail in private-browsing / quota-exceeded scenarios;
      // the in-memory state still works, so we swallow the error.
    }
  }, [key, value]);

  return [value, setValue];
}
