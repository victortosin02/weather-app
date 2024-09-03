import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./Providers/ThemeProvider";

const font = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Weather",
  description: "A weather app built with Next.js and TailwindCSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
