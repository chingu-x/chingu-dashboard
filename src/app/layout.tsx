import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "@/components/StoreProvider";
import ThemeProvider from "@/components/ThemeProvider";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
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
      <body>
        <ThemeProvider
          defaultTheme="light"
          enableSystem={false}
          storageKey="chingu-theme"
          disableTransitionOnChange
        >
          <div className="flex flex-col h-screen">
            <Navbar />
            <StoreProvider>
              <div className="flex flex-1 overflow-hidden">
                <ModalProvider />
                <Sidebar />
                <main className="flex flex-col items-center flex-1 w-full p-10 overflow-y-auto">
                  <div className="flex flex-col max-w-[1353px] gap-y-9">
                    {children}
                  </div>
                </main>
              </div>
            </StoreProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
