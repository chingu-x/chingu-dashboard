import { Navbar } from "@chingu-x/components/navbar";
import ModeToggle from "@/components/ModeToggle";
import AuthBannerContainer from "@/app/(auth)/components/AuthBannerContainer";
import ChinguMenu from "@/components/navbar/ChinguMenu";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Navbar logo={<ChinguMenu />}>
        <div className="pr-2">
          <ModeToggle />
        </div>
      </Navbar>
      <main className="flex h-full w-full flex-col items-center overflow-y-auto p-10">
        <div className="h-full gap-y-9 xl:flex">
          <div className="flex items-center justify-center">
            <AuthBannerContainer />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
