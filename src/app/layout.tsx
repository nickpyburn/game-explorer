import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevents invisible text while loading
});

export const metadata: Metadata = {
  title: "Gamevault",
  description: "A platform for discovering and managing your favorite games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
