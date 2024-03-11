import ModeToggle from "@/components/ModeToggle";
import Navbar from "@/components/navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar>
        <div className="pr-2">
          <ModeToggle />
        </div>
      </Navbar>
      <main className="flex flex-col items-center w-full p-10 overflow-y-auto">
        <div className="gap-y-9">{children}</div>
      </main>
    </div>
  );
}
