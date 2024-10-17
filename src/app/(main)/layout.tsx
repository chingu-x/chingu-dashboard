/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import ModeToggle from "@/components/ModeToggle";
import AuthHeader from "@/components/navbar/AuthHeader";
import { getUser } from "@/utils/getUser";
import AuthProvider from "@/app/(auth)/AuthProvider";
import { useAppDispatch, useAuth, useUser } from "@/store/hooks";
import { clientSignIn } from "@/store/features/auth/authSlice";
import { currentDate } from "@/utils/getCurrentSprint";
import { getUserState } from "@/store/features/user/userSlice";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchUser = async () => await getUser();

    fetchUser()
      .then((data) => {
        dispatch(clientSignIn());
        // Add the currentDate field to the user object
        const currentDateInUserTimezone = formatInTimeZone(
          currentDate,
          data.timezone,
          "yyyy-MM-dd HH:mm:ss",
        );

        const userWithDate = {
          ...data,
          currentDate: new Date(currentDateInUserTimezone),
        };
        // Dispatch the getUserState action with the user object
        dispatch(getUserState(userWithDate));
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, [dispatch]);

  return isAuthenticated ? (
    <div className="flex h-screen w-screen flex-col">
      {/* <AuthProvider user={user} error={error} /> */}
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
  ) : null;
}
