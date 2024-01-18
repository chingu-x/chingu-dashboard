import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import ModeToggle from "@/components/ModeToggle";
import AuthHeader from "@/components/navbar/AuthHeader";

interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function Layout({ children, modal }: LayoutProps) {
  return (
    <div className="flex flex-col w-screen h-screen">
      <div id="portal" />
      {modal}
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
          <div className="flex flex-col max-w-[1353px] gap-y-9">{children}</div>
        </main>
      </div>
    </div>
  );
}
