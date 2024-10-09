/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import ModeToggle from "@/components/ModeToggle";
import AuthHeader from "@/components/navbar/AuthHeader";
import { getUser } from "@/utils/getUser";
import AuthProvider from "@/app/(auth)/AuthProvider";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchUser = async () => await getUser();

    fetchUser()
      .then((data) => setUser(data))
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col">
      <AuthProvider user={user!} error={error!} />
      <Navbar>
        <>
          <ModeToggle />
          <>
            <AuthHeader />
          </>
        </>
      </Navbar>
      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex w-full flex-1 flex-col items-center overflow-y-auto p-10">
          <div className="flex w-full max-w-[1500px] flex-col gap-y-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
