import { Avatar } from "@/components";
import { Bell, ChinguMenu, DropDown } from "@/components/navbar";

const name = "Yorick";
const notificationCount = 4;

export default function Navbar() {
  return (
    <nav className="navbar bg-primary h-8">
      <div className="flex-1 pl-2">
        <ChinguMenu />
      </div>
      <div>
        <Bell notificationCount={notificationCount} />
        <div className="px-2 ml-6 flex flex-row items-center">
          <Avatar image="/img/avatar.png" height={34} width={34} />
          <DropDown name={name} />
        </div>
      </div>
    </nav>
  );
}
