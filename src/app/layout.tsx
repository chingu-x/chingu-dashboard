import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "@/components/StoreProvider";
import ThemeProvider from "@/components/ThemeProvider";
import ToastProvider from "@/components/ToastProvider";
import AuthProvider from "@/components/AuthProvider";
import ModalProvider from "@/components/ModalProvider";

export const metadata: Metadata = {
  title: "Chingu Dashboard",
  description: "Collaborate and gain real experience",
};

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} bg-base-content`}
      suppressHydrationWarning
    >
      <body className="overflow-hidden">
        <ThemeProvider storageKey="chingu-theme" disableTransitionOnChange>
          <StoreProvider>
            <AuthProvider />
            <ToastProvider />
            <ModalProvider />
            {children}
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
