import DropDown from "./DropDown";
import ChinguMenu from "./ChinguMenu";
import Bell from "./Bell";
import Avatar from "@/components/Avatar";
import ModeToggle from "@/components/ModeToggle";

const name = "Yorick";
const notificationCount = 4;

interface NavbarProps {
  isAuthPage: boolean;
}

export default function Navbar({ isAuthPage = false }: NavbarProps) {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1 pl-2">
        <ChinguMenu />
      </div>
      <div className="flex gap-x-10">
        <ModeToggle />
        {!isAuthPage ? (
          <>
            <Bell notificationCount={notificationCount} />
            <div className="flex flex-row items-center px-2 ml-6">
              <Avatar image="/img/avatar.png" height={34} width={34} />
              <DropDown name={name} />
            </div>
          </>
        ) : null}
      </div>
    </nav>
  );
}
