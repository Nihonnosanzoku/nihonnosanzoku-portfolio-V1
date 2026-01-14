import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Modern ve temiz bir font
import "./globals.css";
import { siteMetadata } from "@/lib/metadata"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      {/* className kısmına fontu ekleyerek tüm projeye yayıyoruz */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}