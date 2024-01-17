import ChinguMenu from "./ChinguMenu";

interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <nav className="flex navbar bg-base-100">
      <div className="flex flex-1 items-center pl-2">
        <ChinguMenu />
      </div>
      <div className="flex gap-x-10">{children}</div>
    </nav>
  );
}
