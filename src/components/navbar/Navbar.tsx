import ChinguMenu from "./ChinguMenu";

interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <nav className="flex h-[65px] bg-base-100 p-2">
      <div className="flex flex-1 sm:flex-row sm:pl-2">
        <ChinguMenu />
      </div>
      <div className="flex items-center space-x-2 sm:gap-x-10">{children}</div>
    </nav>
  );
}
