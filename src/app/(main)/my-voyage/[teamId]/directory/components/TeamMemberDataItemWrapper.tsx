import { cn } from "@/lib/utils";

interface TeamMemberDataItemWrapperProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export default function TeamMemberDataItemWrapper({
  label,
  children,
  className,
}: TeamMemberDataItemWrapperProps) {
  return (
    <div
      className={cn(
        "w-auto min-w-[500px] 3xl:min-w-0 grid items-center grid-cols-2 3xl:grid-cols-1 pb-6 3xl:pb-4",
        className,
      )}
    >
      <div className="font-semibold 3xl:hidden">{label}</div>
      <div>{children}</div>
    </div>
  );
}
