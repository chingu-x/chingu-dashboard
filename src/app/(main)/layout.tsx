"use client";

import "reflect-metadata";
import { useQuery } from "@tanstack/react-query";
import { formatInTimeZone } from "date-fns-tz";
import { useRouter } from "next/navigation";
import { type UserClientAdapter } from "@/modules/user/adapters/primary/userClientAdapter";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import ModeToggle from "@/components/ModeToggle";
import AuthHeader from "@/components/navbar/AuthHeader";
import { useAppDispatch } from "@/store/hooks";
import { clientSignIn } from "@/store/features/auth/authSlice";
import routePaths from "@/utils/routePaths";
import { getUserState } from "@/store/features/user/userSlice";
import { currentDate } from "@/utils/getCurrentSprint";
import { TYPES } from "@/di/types";
import { resolve } from "@/di/resolver";
import Spinner from "@/components/Spinner";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isPending, isError, data } = useQuery({
    queryKey: ["user"],
    queryFn: getUserQuery,
  });

  async function getUserQuery() {
    const userAdapter = resolve<UserClientAdapter>(TYPES.UserClientAdapter);
    return await userAdapter.getUser();
  }

  if (isPending) {
    return <Spinner />;
  }

  // TODO: refactor
  if (isError) {
    router.push(routePaths.signIn());
  }

  if (data) {
    dispatch(clientSignIn());

    const currentDateInUserTimezone = formatInTimeZone(
      currentDate,
      data.timezone,
      "yyyy-MM-dd HH:mm:ss",
    );

    const userWithDate = {
      ...data,
      currentDate: new Date(currentDateInUserTimezone),
    };

    dispatch(getUserState(userWithDate));
  }

  return (
    <div className="flex h-screen w-screen flex-col">
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
