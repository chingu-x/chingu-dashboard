import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import ModeToggle from "@/components/ModeToggle";
import AuthHeader from "@/components/navbar/AuthHeader";
import { getUser } from "@/utils/getUser";
import AuthProvider from "@/components/AuthProvider";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  let user;

  try {
    user = await getUser();
  } catch (error) {}

  return (
    <div className="flex flex-col h-screen w-screen">
      {user && <AuthProvider user={user} />}
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
        <main className="flex flex-1 flex-col items-center w-full p-10 overflow-y-auto">
          <div className="gap-y-9 max-w-[1353px] w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
