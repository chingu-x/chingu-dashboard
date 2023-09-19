import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StoreProvider, Navbar, Sidebar } from "@/components";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
    <html lang="en" className={`${inter.className} bg-base-content`}>
      <body>
        <div className="flex min-h-screen">
          <Navbar />
          <StoreProvider>
            <Sidebar />
            <main className="mt-16 flex-1 bg-yellow-200 w-fit">{children}</main>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
