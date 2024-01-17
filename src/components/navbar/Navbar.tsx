import ChinguMenu from "./ChinguMenu";

interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <nav className="flex navbar bg-base-100 p-2">
      <div className="flex flex-1 items-center pl-2">
        <ChinguMenu />
      </div>
      <div className="border border-red-500 flex items-center gap-x-10">{children}</div>
    </nav>
  );
}
