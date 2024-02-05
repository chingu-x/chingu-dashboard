import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import ModeToggle from "@/components/ModeToggle";
import AuthHeader from "@/components/navbar/AuthHeader";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen w-screen">
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
