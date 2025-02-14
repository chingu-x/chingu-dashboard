import "reflect-metadata";
import "@chingu-x/modules/config";
import "@chingu-x/components/styles";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "@/components/providers/StoreProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import ModalProvider from "@/components/providers/ModalProvider";
import { TanstackQueryProvider } from "@/components/providers/TanstackQueryProvider";

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
            <TanstackQueryProvider>
              <ModalProvider />
              {children}
            </TanstackQueryProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
