import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/content/canonical";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const description =
  "Shaun Barry — mortgage lending professional (Refi.com / Veterans United) building borrower-first AI for the mortgage industry. Based in the Clarkston, Michigan area.";

export const metadata: Metadata = {
  title: "Shaun Barry — Mortgage and AI Technology",
  description,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Shaun Barry — Mortgage and AI Technology",
    description,
    type: "profile",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image", title: "Shaun Barry — Mortgage and AI Technology", description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} no-js antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }}
        />
      </head>
      <body className="grain min-h-dvh font-sans">{children}</body>
    </html>
  );
}
