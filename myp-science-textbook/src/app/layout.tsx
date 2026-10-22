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
      <body>{children}</body>
    </html>
  );
}
