"use client";

import { useSyncExternalStore } from "react";
export const defaults = {
  size: "standard",
  spacing: "comfortable",
  width: "comfortable",
  appearance: "paper",
  rate: "1",
  language: "es",
} as const;
export type Preferences = { -readonly [K in keyof typeof defaults]: string };
const options: Record<keyof Preferences, readonly string[]> = {
  size: ["standard", "large", "larger"],
  spacing: ["comfortable", "spacious"],
  width: ["comfortable", "narrow"],
  appearance: ["paper", "warm", "contrast"],
  rate: ["0.75", "1", "1.25", "1.5"],
  language: ["es", "ja"],
};
const key = "mosaic-reading-preferences-v1";
const initial = JSON.stringify(defaults);
let memory = initial;
function snapshot() {
  try {
    return localStorage.getItem(key) ?? memory;
  } catch {
    return memory;
  }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("mosaic-preferences", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("mosaic-preferences", callback);
  };
}
export function usePreferences() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => initial);
  let saved: Partial<Preferences> = {};
  try {
    saved = JSON.parse(raw) ?? {};
  } catch {}
  const preferences: Preferences = { ...defaults };
  for (const name of Object.keys(defaults) as (keyof Preferences)[]) {
    if (options[name].includes(saved[name] ?? ""))
      preferences[name] = saved[name]!;
  }
  function update(change: Partial<Preferences>) {
    memory = JSON.stringify({ ...preferences, ...change });
    try {
      localStorage.setItem(key, memory);
    } catch {}
    window.dispatchEvent(new Event("mosaic-preferences"));
  }
  return { preferences, update, reset: () => update({ ...defaults }) };
}
