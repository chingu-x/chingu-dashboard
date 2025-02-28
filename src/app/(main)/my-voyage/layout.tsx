interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex w-full max-w-[1500px] flex-col gap-y-10 py-10">
      {children}
    </div>
  );
}
