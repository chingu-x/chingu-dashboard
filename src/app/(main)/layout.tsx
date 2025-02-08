"use client";

import "reflect-metadata";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import ModeToggle from "@/components/ModeToggle";
import AuthHeader from "@/components/navbar/AuthHeader";
import { useAppDispatch } from "@/store/hooks";
import { clientSignIn } from "@/store/features/auth/authSlice";
import routePaths from "@/utils/routePaths";
import { getUserState } from "@/store/features/user/userSlice";
import Spinner from "@/components/Spinner";
import { CacheTag } from "@/utils/cacheTag";
import { userAdapter } from "@/utils/adapters";
import { currentDate } from "@/utils/getCurrentSprint";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isPending, isError, data } = useQuery({
    queryKey: [CacheTag.me],
    queryFn: getUserQuery,
    staleTime: 1000 * 60 * 30, // This sets it to 30 minutes, which is how long the access token lasts
  });

  async function getUserQuery() {
    return await userAdapter.fetchUser({ currentDate });
  }

  if (isError) {
    router.push(routePaths.signIn());
  }

  if (data) {
    dispatch(clientSignIn());
    dispatch(getUserState(data));
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
            {isPending ? (
              <div className="flex min-h-screen items-center justify-center">
                <Spinner />
              </div>
            ) : (
              children
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
