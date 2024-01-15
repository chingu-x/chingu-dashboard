import ChinguMenu from "./ChinguMenu";

interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <nav className="navbar flex bg-base-100 h-[75px]">
      <div className="flex-1 pl-2">
        <ChinguMenu />
      </div>
      <div className="flex gap-x-10">{children}</div>
    </nav>
  );
}
