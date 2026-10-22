# MYP Science Textbook — Milestone 3

A student-facing Next.js App Router prototype using TypeScript and Tailwind CSS. The demonstration chapter is **Chemical Reactions → Conservation of Mass**. “Mosaic” is a temporary design name.

## Run on your Mac

Install Node.js 24 LTS if needed, then open Terminal in this folder:

```sh
npm ci
npm run dev
```

Open `http://localhost:3000` in your Mac's browser. Stop the server with Control+C.

In the cloud workspace the project folder is `/workspace/myp_site/myp-science-textbook`. A cloud server is separate from your Mac; localhost on your Mac does not reach the cloud server. The cloud onboarding interface does not provide a web preview.

## Check and run a production build

```sh
npm run lint
npm run build
npm run start
```

## What to review

- Sidebar and in-chapter links, plus a back-to-top link.
- Reading layout at desktop, tablet, and phone widths.
- Learning objectives, explanations, an illustrative particle model, atom-count table, worked example, and summary.
- Keyboard focus, skip link, diagram description, reduced-motion support, and print layout.

All scientific text and the original SVG illustration are demonstration material, not extracted from teacher materials. No source attribution is implied. Teacher review is required before classroom publication.

Only one chapter exists. Subject/year labels describe this sample; they are not selectors. Six highlighted vocabulary terms open definition dialogs with examples. Three optional “Explore further” explanations expand in place. Use Tab and Enter to open definitions; Escape or “Back to reading” closes them and returns focus. Explanation headings support Enter and Space. Reading preferences, paragraph narration, and Spanish/Japanese sample translations are included. Accounts, database, editor, AI importing, and paid services are not included in this stage. PostgreSQL, Prisma, and Tiptap should be added when their features are implemented.

## Files

- `src/app/page.tsx`: chapter content, navigation, and particle diagram.
- `src/components/Vocabulary.tsx`: accessible definition dialogs.
- `src/content/vocabulary.ts`: reusable demonstration definitions and examples.
- `src/app/globals.css`: responsive styling and print styles.
- `src/app/layout.tsx`: page title, description, and English language setting.

The application lives inside its own folder and does not access any Biology assessment application.

## Milestone 3 reading tools

Open **Make this chapter comfortable to read** above the learning objectives. Choose text size, line spacing, reading width, paper/warm/high-contrast appearance, reading speed, and translation language. Choices persist on this browser when local storage is available; Reset preferences restores defaults. No student account is used.

All 17 explanatory paragraphs (including the introduction, worked example, and optional explanations) have **Listen** and **Translate** controls. English stays visible when translations are shown. Diagrams, headings, tables, summary bullets, and vocabulary cards are not narrated by these paragraph controls.

- Listen uses the browser's Web Speech API, with Pause, Resume, Replay, Stop, and speeds from 0.75× to 1.5×. Starting a new paragraph stops the previous one. Changing speed restarts the current paragraph; closing an explanation stops narration inside it.
- The active paragraph is outlined. Word highlighting additionally requires word-boundary events from the selected browser voice and the CSS Highlight API. Paragraph highlighting remains when word highlighting is unavailable.
- Actual voices, pronunciation of scientific formulas, audio playback, and pause/resume behavior depend on the browser and operating system. Install/enable an English voice and test audible playback on your Mac. Automated tests simulate speech events; they do not establish audible output on your device. Browser/OS voice services may use their own network services; this app does not call a speech API or collect audio.
- Translation uses prepared, AI-authored **demonstration translations** for this chapter in Spanish and Japanese. These require teacher/language review and are not a general translation engine. English scientific terms are retained in parentheses. There is no translation API, API key, or fee. Future chapters need their own reviewed translations or a separately chosen translation service. The English text remains the teaching reference.

## Browser checks

```sh
npx playwright install chromium
npm run test:e2e
```

Stop an existing development server for this project before running the suite; Next.js permits one development server per project. Tests start their own server on port 3100. To use an installed Chromium instead of downloading one, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable path. Tests cover preferences and persistence, both translation languages, preserved English terminology, responsive layouts at three widths, previous vocabulary/explanation interactions, narration lifecycle with simulated speech events, and unavailable speech/blocked storage. Real device audio and assistive-technology checks remain manual.

Additional implementation files: `src/components/Reader.tsx`, `Paragraph.tsx`, `reading-preferences.ts`, `speech-highlight.ts`, and `src/content/translations.ts`. Optional word-highlight styling is supplied directly in `src/app/layout.tsx` because the current Tailwind optimizer does not recognize that native CSS pseudo-element.
