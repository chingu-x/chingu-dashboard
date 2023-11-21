import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import ModeToggle from "@/components/ModeToggle";
import Bell from "@/components/navbar/Bell";
import Avatar from "@/components/Avatar";
import DropDown from "@/components/navbar/DropDown";

interface LayoutProps {
  children: React.ReactNode;
}

const name = "Yorick";
const notificationCount = 4;

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar>
        <div className="flex gap-x-10">
          <ModeToggle />
          {
            <>
              <Bell notificationCount={notificationCount} />
              <div className="flex flex-row items-center px-2 ml-6">
                <Avatar image="/img/avatar.png" height={34} width={34} />
                <DropDown name={name} />
              </div>
            </>
          }
        </div>
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
