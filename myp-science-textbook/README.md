# MYP Science Textbook — Milestone 2

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

Only one chapter exists. Subject/year labels describe this sample; they are not selectors. Six highlighted vocabulary terms open definition dialogs with examples. Three optional “Explore further” explanations expand in place. Use Tab and Enter to open definitions; Escape or “Back to reading” closes them and returns focus. Explanation headings support Enter and Space. Milestone 3 tools remain deferred. Accounts, database, editor, translation, narration, AI importing, and paid services are not included in this stage. PostgreSQL, Prisma, and Tiptap should be added when their features are implemented.

## Files

- `src/app/page.tsx`: chapter content, navigation, and particle diagram.
- `src/components/Vocabulary.tsx`: accessible definition dialogs.
- `src/content/vocabulary.ts`: reusable demonstration definitions and examples.
- `src/app/globals.css`: responsive styling and print styles.
- `src/app/layout.tsx`: page title, description, and English language setting.

The application lives inside its own folder and does not access any Biology assessment application.
