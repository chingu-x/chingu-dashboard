import Image from "next/image";
import Bell from "./Bell";
import ChinguMenu from "./ChinguMenu";
import DropDown from "./DropDown";

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
        <ul className="menu menu-horizontal px-1 ml-6">
          <li className="flex flex-row items-center">
            <div className="px-0 pointer-events-none">
              <Image
                width={32}
                height={32}
                src="/avatar.png"
                alt="Profile image"
              />
            </div>
            <DropDown name={name} />
          </li>
        </ul>
      </div>
    </nav>
  );
}
