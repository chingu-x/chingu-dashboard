"use client";

import ModeToggle from "@/components/ModeToggle";
import Navbar from "@/components/navbar/Navbar";
import AuthBannerContainer from "@/app/(auth)/components/AuthBannerContainer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Navbar>
        <div className="pr-2">
          <ModeToggle />
        </div>
      </Navbar>
      <main className="flex h-full w-full flex-col items-center overflow-y-auto p-10">
        <div className="h-full gap-y-9 xl:flex">
          <div className="flex items-center justify-center">
            <AuthBannerContainer />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
