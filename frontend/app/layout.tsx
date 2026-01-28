import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BizStartup | Exclusive Founder Benefits",
  description: "Accelerate your startup with premium deals and credits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen text-gray-900`}
      >
        <Navbar />
        <main>{children}</main>
        <footer className="bg-white border-t border-gray-100 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-8 text-center text-gray-400 text-sm font-medium">
            © 2026 BizStartup. Empowering the next generation of founders.
          </div>
        </footer>
      </body>
    </html>
  );
}
