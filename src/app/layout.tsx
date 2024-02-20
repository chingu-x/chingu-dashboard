import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RouteChangeListener } from "./route-change-listener";
import StoreProvider from "@/components/providers/StoreProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import ToastProvider from "@/components/providers/ToastProvider";
import ModalProvider from "@/components/providers/ModalProvider";
import { getAccessToken } from "@/utils/getCookie";

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
  const cookie = getAccessToken();

  return (
    <html
      lang="en"
      className={`${inter.className} bg-base-content`}
      suppressHydrationWarning
    >
      <body className="overflow-hidden">
        <RouteChangeListener cookie={cookie} />
        <ThemeProvider storageKey="chingu-theme" disableTransitionOnChange>
          <StoreProvider>
            <ToastProvider />
            <ModalProvider />
            {children}
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
