import { Avatar, ModeToggle } from "@/components";
import { Bell, ChinguMenu, DropDown } from "@/components/navbar";

const name = "Yorick";
const notificationCount = 4;

export default function Navbar() {
  return (
    <nav className="h-8 navbar bg-primary">
      <div className="flex-1 pl-2">
        <ChinguMenu />
      </div>
      <div className="flex gap-x-10">
        <ModeToggle />
        <Bell notificationCount={notificationCount} />
        <div className="flex flex-row items-center pr-2">
          <Avatar image="/avatar.png" height={34} width={34} />
          <DropDown name={name} />
        </div>
      </div>
    </nav>
  );
}
