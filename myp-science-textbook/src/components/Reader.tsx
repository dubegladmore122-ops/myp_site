"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { usePreferences } from "./reading-preferences";
import { clearSpeechHighlight } from "./speech-highlight";

type SpeechRequest = {
  id: string;
  text: string;
  highlight: (index: number, length: number) => void;
};
type Narration = { id: string | null; status: "idle" | "playing" | "paused" };
type ReaderContext = {
  narration: Narration;
  supported: boolean;
  speak: (request: SpeechRequest, rate?: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  changeRate: (rate: string) => void;
  message: string;
};
const Context = createContext<ReaderContext | null>(null);
const noSubscribe = () => () => {};
export function useReader() {
  const reader = useContext(Context);
  if (!reader) throw new Error("ReaderProvider is required");
  return reader;
}
export function ReaderProvider({ children }: { children: ReactNode }) {
  const { preferences, update } = usePreferences();
  const supported = useSyncExternalStore(
    noSubscribe,
    () =>
      typeof window.speechSynthesis?.speak === "function" &&
      typeof window.SpeechSynthesisUtterance === "function",
    () => false,
  );
  const [narration, setNarration] = useState<Narration>({
    id: null,
    status: "idle",
  });
  const [message, setMessage] = useState("");
  const generation = useRef(0);
  const request = useRef<SpeechRequest | null>(null);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  function stop() {
    generation.current++;
    if (supported) window.speechSynthesis.cancel();
    request.current = null;
    utterance.current = null;
    clearSpeechHighlight();
    setNarration({ id: null, status: "idle" });
    setMessage("");
  }
  function speak(next: SpeechRequest, rate = Number(preferences.rate)) {
    if (!supported) {
      setMessage(
        "Read Aloud is unavailable in this browser. Try Safari, Chrome, or Edge with an installed English voice.",
      );
      return;
    }
    generation.current++;
    const token = generation.current;
    window.speechSynthesis.cancel();
    clearSpeechHighlight();
    const speech = new SpeechSynthesisUtterance(next.text);
    utterance.current = speech;
    request.current = next;
    speech.lang = "en-GB";
    speech.rate = rate;
    speech.onboundary = (event) => {
      if (token === generation.current && event.name === "word")
        next.highlight(event.charIndex, event.charLength);
    };
    speech.onend = () => {
      if (token !== generation.current) return;
      request.current = null;
      utterance.current = null;
      clearSpeechHighlight();
      setNarration({ id: null, status: "idle" });
      setMessage("Paragraph finished.");
    };
    speech.onerror = () => {
      if (token !== generation.current) return;
      request.current = null;
      utterance.current = null;
      clearSpeechHighlight();
      setNarration({ id: null, status: "idle" });
      setMessage(
        "Your browser could not read this paragraph. Check that an English voice is installed and audio is enabled, then try again.",
      );
    };
    setMessage("");
    setNarration({ id: next.id, status: "playing" });
    window.speechSynthesis.resume();
    window.speechSynthesis.speak(speech);
  }
  function pause() {
    if (!supported || narration.status !== "playing") return;
    window.speechSynthesis.pause();
    setNarration({ ...narration, status: "paused" });
  }
  function resume() {
    if (!supported || narration.status !== "paused") return;
    window.speechSynthesis.resume();
    setNarration({ ...narration, status: "playing" });
  }
  function changeRate(rate: string) {
    update({ rate });
    if (request.current) speak(request.current, Number(rate));
  }
  useEffect(
    () => () => {
      generation.current++;
      window.speechSynthesis?.cancel();
      clearSpeechHighlight();
    },
    [],
  );
  useEffect(() => {
    function collapsed(event: Event) {
      const element = event.target;
      if (
        element instanceof HTMLDetailsElement &&
        !element.open &&
        request.current &&
        element.querySelector(`[data-paragraph-id="${request.current.id}"]`)
      ) {
        generation.current++;
        window.speechSynthesis?.cancel();
        request.current = null;
        utterance.current = null;
        clearSpeechHighlight();
        setNarration({ id: null, status: "idle" });
        setMessage("");
      }
    }
    document.addEventListener("toggle", collapsed, true);
    return () => document.removeEventListener("toggle", collapsed, true);
  }, []);
  const style = {
    "--reader-font": { standard: "16px", large: "18px", larger: "20px" }[
      preferences.size
    ],
    "--reader-leading": preferences.spacing === "spacious" ? "2.2" : "1.85",
    "--reader-width": preferences.width === "narrow" ? "58ch" : "none",
  } as CSSProperties;
  return (
    <Context.Provider
      value={{
        narration,
        supported,
        speak,
        pause,
        resume,
        stop,
        changeRate,
        message,
      }}
    >
      <div
        className="reader"
        data-appearance={preferences.appearance}
        style={style}
      >
        {children}
      </div>
    </Context.Provider>
  );
}
export function ReadingTools() {
  const { preferences, update, reset } = usePreferences();
  const reader = useReader();
  return (
    <section className="reading-tools" aria-label="Reading tools">
      <details>
        <summary>
          Make this chapter comfortable to read{" "}
          <span className="tools-hint">Reading preferences</span>
        </summary>
        <div className="preference-grid">
          <div>
            <label htmlFor="reader-text-size">Text size</label>
            <select
              id="reader-text-size"
              value={preferences.size}
              onChange={(e) => update({ size: e.target.value })}
            >
              <option value="standard">Standard</option>
              <option value="large">Large</option>
              <option value="larger">Extra large</option>
            </select>
          </div>
          <div>
            <label htmlFor="reader-line-spacing">Line spacing</label>
            <select
              id="reader-line-spacing"
              value={preferences.spacing}
              onChange={(e) => update({ spacing: e.target.value })}
            >
              <option value="comfortable">Comfortable</option>
              <option value="spacious">Spacious</option>
            </select>
          </div>
          <div>
            <label htmlFor="reader-reading-width">Reading width</label>
            <select
              id="reader-reading-width"
              value={preferences.width}
              onChange={(e) => update({ width: e.target.value })}
            >
              <option value="comfortable">Comfortable</option>
              <option value="narrow">Narrow</option>
            </select>
          </div>
          <div>
            <label htmlFor="reader-appearance">Appearance</label>
            <select
              id="reader-appearance"
              value={preferences.appearance}
              onChange={(e) => update({ appearance: e.target.value })}
            >
              <option value="paper">Paper</option>
              <option value="warm">Warm</option>
              <option value="contrast">High contrast</option>
            </select>
          </div>
          <div>
            <label htmlFor="reader-reading-speed">Reading speed</label>
            <select
              id="reader-reading-speed"
              value={preferences.rate}
              onChange={(e) => reader.changeRate(e.target.value)}
            >
              <option value="0.75">0.75× — Slower</option>
              <option value="1">1× — Normal</option>
              <option value="1.25">1.25× — Faster</option>
              <option value="1.5">1.5× — Fast</option>
            </select>
          </div>
          <div>
            <label htmlFor="reader-translation-language">
              Translation language
            </label>
            <select
              id="reader-translation-language"
              value={preferences.language}
              onChange={(e) => update({ language: e.target.value })}
            >
              <option value="es">Español — Spanish</option>
              <option value="ja">日本語 — Japanese</option>
            </select>
          </div>
        </div>
        <p>
          Preferences stay in this browser when storage is available. Changing
          speed restarts the current paragraph. Translations are prepared
          demonstrations for this sample chapter and need teacher review.
        </p>
        <button
          type="button"
          className="reader-button"
          onClick={() => {
            reader.stop();
            reset();
          }}
        >
          Reset preferences
        </button>
      </details>
      <div className="speech-status">
        <span>
          {reader.supported
            ? "Use Listen beside a paragraph. English voices and word highlighting depend on your browser."
            : "Read Aloud is unavailable in this browser. Text and translations remain available."}
        </span>
        {reader.narration.id && (
          <div className="speech-actions">
            <button
              className="reader-button"
              type="button"
              onClick={
                reader.narration.status === "paused"
                  ? reader.resume
                  : reader.pause
              }
            >
              {reader.narration.status === "paused"
                ? "Resume reading"
                : "Pause reading"}
            </button>
            <button
              className="reader-button"
              type="button"
              onClick={reader.stop}
            >
              Stop reading
            </button>
          </div>
        )}
      </div>
      <p className="reader-status" role="status">
        {reader.message ||
          (reader.narration.status === "paused"
            ? "Reading paused."
            : reader.narration.status === "playing"
              ? "Reading an English paragraph."
              : "")}
      </p>
    </section>
  );
}
