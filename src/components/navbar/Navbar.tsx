import { Avatar } from "..";
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
            <Avatar imgPath="/avatar.png" height={34} width={34} />
            <DropDown name={name} />
          </li>
        </ul>
      </div>
    </nav>
  );
}
