import Navbar from "@/components/navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar isAuthPage={true} />
      <main className="flex flex-col items-center flex-1 w-full pt-96 xl:pt-0 p-10 overflow-y-auto justify-center">
        <div className="flex flex-col max-w-[1353px] gap-y-9">{children}</div>
      </main>
    </div>
  );
}
