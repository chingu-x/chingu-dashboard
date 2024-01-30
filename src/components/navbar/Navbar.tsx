import ChinguMenu from "./ChinguMenu";

interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <nav className="flex flex bg-base-100 p-2 h-[75px]">
      <div className="flex flex-1 sm:pl-2 sm:flex-row">
        <ChinguMenu />
      </div>
      <div className="flex items-center space-x-2 sm:gap-x-10 ">{children}</div>
    </nav>
  );
}
