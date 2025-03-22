import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona_sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "AI Interview",
  description: "AI interview preparation using custom AI generated questions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monaSans.className} antialiased pattern bg-gray-900 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
