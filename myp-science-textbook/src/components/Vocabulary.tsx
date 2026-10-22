"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { vocabulary, type VocabularyTerm } from "@/content/vocabulary";

function Definition({
  term,
  id,
  onClose,
}: {
  term: VocabularyTerm;
  id: string;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const entry = vocabulary[term];
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
  }, []);
  return (
    <dialog
      ref={dialog}
      id={id}
      className="vocabulary-dialog"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-definition`}
      onClose={onClose}
    >
      <span className="eyebrow">SCIENCE VOCABULARY</span>
      <h2 id={`${id}-title`}>{entry.title}</h2>
      <p id={`${id}-definition`}>{entry.definition}</p>
      <div className="vocabulary-example">
        <span className="eyebrow">FOR EXAMPLE</span>
        <p>{entry.example}</p>
      </div>
      <form method="dialog">
        <button className="definition-close" type="submit">
          Back to reading
        </button>
      </form>
      <small>Demonstration definition · press Escape to close</small>
    </dialog>
  );
}

export default function Vocabulary({
  term,
  children,
}: {
  term: VocabularyTerm;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const entry = vocabulary[term];
  function close() {
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }
  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="vocabulary-term"
        aria-label={`Define ${entry.title.toLowerCase()}`}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      {open &&
        createPortal(
          <Definition term={term} id={id} onClose={close} />,
          document.body,
        )}
    </>
  );
}
