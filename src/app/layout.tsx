import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import StoreProvider from "@/components/StoreProvider";
import ThemeProvider from "@/components/ThemeProvider";
import ModalProvider from "@/components/ModalProvider";
import ToastProvider from "@/components/ToastProvider";
import AuthInit from "@/components/AuthInit";

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
  const hasCookie = cookies().has("access_token");

  return (
    <html
      lang="en"
      className={`${inter.className} bg-base-content`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider storageKey="chingu-theme" disableTransitionOnChange>
          <StoreProvider>
            <AuthInit hasCookie={hasCookie} />
            <ToastProvider />
            <ModalProvider />
            {children}
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
