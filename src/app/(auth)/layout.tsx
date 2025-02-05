import ModeToggle from "@/components/ModeToggle";
import Navbar from "@/components/navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Navbar>
        <div className="pr-2">
          <ModeToggle />
        </div>
      </Navbar>
      <main className="relative flex h-full w-full flex-col items-center overflow-y-auto p-10">
        <div className="h-full gap-y-9 xl:flex">
          <div className="flex items-center justify-center">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
