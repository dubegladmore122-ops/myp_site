import { ReaderProvider } from "@/components/Reader";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Conservation of Mass | Mosaic MYP Science",
  description:
    "A demonstration MYP Science textbook chapter exploring conservation of mass, closed systems, and balanced equations.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <style>{`::highlight(spoken-word) { color: #182e16; background-color: #f0cf68; text-decoration: underline; } @media print { ::highlight(spoken-word) { background-color: transparent; } }`}</style>
      </head>
      <body>
        <ReaderProvider>{children}</ReaderProvider>
      </body>
    </html>
  );
}
