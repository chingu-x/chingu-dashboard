import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar isAuthPage={false} />
      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex flex-col items-center flex-1 w-full p-10 overflow-y-auto">
          <div className="flex flex-col max-w-[1353px] gap-y-9">{children}</div>
        </main>
      </div>
    </div>
  );
}
