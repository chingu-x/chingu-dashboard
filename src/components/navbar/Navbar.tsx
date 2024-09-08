import ChinguMenu from "./ChinguMenu";

interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <nav className="flex h-[75px] justify-between border-b border-base-100 bg-base-200 py-3 pl-6 pr-2 shadow-sm sm:px-10">
      <div className="flex items-center sm:flex-row sm:pl-2">
        <ChinguMenu />
      </div>
      <div className="flex items-center gap-x-8 sm:gap-x-10">{children}</div>
    </nav>
  );
}
