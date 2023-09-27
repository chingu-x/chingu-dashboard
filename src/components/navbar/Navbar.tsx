import { Avatar, Bell, ChinguMenu, DropDown, ModeToggle } from "@/components";

const name = "Yorick";
const notificationCount = 4;

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1 pl-2">
        <ChinguMenu />
      </div>
      <div className="flex gap-x-10">
        <ModeToggle />
        <Bell notificationCount={notificationCount} />
        <div className="flex flex-row items-center px-2 ml-6">
          <Avatar image="/img/avatar.png" height={34} width={34} />
          <DropDown name={name} />
        </div>
      </div>
    </nav>
  );
}
