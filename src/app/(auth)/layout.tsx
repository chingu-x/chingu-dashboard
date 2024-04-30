import ModeToggle from "@/components/ModeToggle";
import Navbar from "@/components/navbar/Navbar";
import AuthBannerContainer from "@/app/(auth)/components/AuthBannerContainer";

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
        <div className="gap-y-9">
          <div className="flex flex-col xl:flex-row items-center justify-center">
            <AuthBannerContainer />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
