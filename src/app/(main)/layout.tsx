import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import ModeToggle from "@/components/ModeToggle";
import AuthHeader from "@/components/navbar/AuthHeader";
import { getUser } from "@/utils/getUser";
import AuthProvider from "@/app/(auth)/AuthProvider";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const [user, error] = await getUser();

  return (
    <div className="flex flex-col w-screen h-screen">
      <AuthProvider user={user} error={error} />
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
        <main className="flex flex-col items-center flex-1 w-full p-10 overflow-y-auto">
          <div className="flex flex-col w-full max-w-[1500px] gap-y-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
