import { useEffect, useRef, useState } from "react";

/**
 * Discriminated union representing every state a fetch can be in.
 * Consumers narrow on `status` to get fully-typed access to `data` / `error`.
 */
export type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

/**
 * Generic data-fetching hook.
 *
 * @param url - request URL, or `null` to skip fetching (e.g. no search
 *   submitted yet, or a required API key is missing).
 * @param parse - optional transform applied to the raw JSON before it's
 *   stored, so components can request already-shaped data.
 */
export function useFetch<T>(
  url: string | null,
  parse?: (raw: unknown) => T,
): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ status: "idle" });
  // Keeps `parse` referentially stable inside the effect without forcing
  // callers to memoize it themselves. Updated in an effect (not during
  // render) so we never mutate a ref while rendering.
  const parseRef = useRef(parse);
  useEffect(() => {
    parseRef.current = parse;
  });

  useEffect(() => {
    if (!url) {
      setState({ status: "idle" });
      return;
    }

    const controller = new AbortController();
    setState({ status: "loading" });

    fetch(url, { signal: controller.signal })
      .then(async (res) => {
        const raw: unknown = await res.json();
        if (!res.ok) {
          const message =
            raw && typeof raw === "object" && "message" in raw
              ? String((raw as { message: unknown }).message)
              : `Request failed: ${res.status} ${res.statusText}`;
          throw new Error(message);
        }
        const data = parseRef.current ? parseRef.current(raw) : (raw as T);
        setState({ status: "success", data });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        const message = err instanceof Error ? err.message : "Unknown error";
        setState({ status: "error", error: message });
      });

    return () => controller.abort();
  }, [url]);

  return state;
}
