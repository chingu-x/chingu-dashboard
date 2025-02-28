import { Navbar } from "@chingu-x/components/navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import ModeToggle from "@/components/ModeToggle";
import AuthHeader from "@/components/navbar/AuthHeader";
import { getUser } from "@/utils/getUser";
import AuthProvider from "@/app/(auth)/AuthProvider";
import ChinguMenu from "@/components/navbar/ChinguMenu";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const [user, error] = await getUser();

  return (
    <div className="flex h-screen w-screen flex-col">
      <AuthProvider user={user} error={error} />
      <Navbar logo={<ChinguMenu />}>
        <>
          <ModeToggle />
          <>
            <AuthHeader />
          </>
        </>
      </Navbar>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="relative flex w-full flex-1 flex-col items-center overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
