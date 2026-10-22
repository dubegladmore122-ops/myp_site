"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import {
  languages,
  translations,
  type Language,
  type ParagraphId,
} from "@/content/translations";
import { usePreferences } from "./reading-preferences";
import { useReader } from "./Reader";
import { paragraphSpeech } from "./speech-highlight";

export default function Paragraph({
  id,
  children,
  className = "",
}: {
  id: ParagraphId;
  children: ReactNode;
  className?: string;
}) {
  const original = useRef<HTMLParagraphElement>(null);
  const [translated, setTranslated] = useState(false);
  const translationId = useId();
  const { preferences } = usePreferences();
  const reader = useReader();
  const active = reader.narration.id === id;
  const language = preferences.language as Language;
  function listen() {
    if (original.current) {
      const speech = paragraphSpeech(original.current);
      reader.speak({ id, ...speech });
    }
  }
  return (
    <div
      className={`supported-paragraph ${active ? "is-speaking" : ""}`}
      data-paragraph-id={id}
    >
      <p ref={original} className={`paragraph-original ${className}`} lang="en">
        {children}
      </p>
      <div
        className="paragraph-controls"
        role="group"
        aria-label="Paragraph reading controls"
      >
        <button
          type="button"
          className="reader-button"
          disabled={!reader.supported}
          onClick={listen}
        >
          {active ? "Replay" : "Listen"}
        </button>
        {active && (
          <>
            <button
              type="button"
              className="reader-button"
              onClick={
                reader.narration.status === "paused"
                  ? reader.resume
                  : reader.pause
              }
            >
              {reader.narration.status === "paused" ? "Resume" : "Pause"}
            </button>
            <button
              type="button"
              className="reader-button"
              onClick={reader.stop}
            >
              Stop
            </button>
          </>
        )}
        <button
          type="button"
          className="reader-button"
          aria-expanded={translated}
          aria-controls={translationId}
          onClick={() => setTranslated(!translated)}
        >
          {translated
            ? "Hide translation"
            : `Translate · ${languages[language]}`}
        </button>
      </div>
      <div
        id={translationId}
        hidden={!translated}
        className="paragraph-translation"
      >
        <span className="eyebrow">
          {languages[language]} · DEMONSTRATION TRANSLATION
        </span>
        <p lang={language}>{translations[id][language]}</p>
        <small>
          English scientific terms are kept in brackets. Teacher review
          required.
        </small>
      </div>
    </div>
  );
}
