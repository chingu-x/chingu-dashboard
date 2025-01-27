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
        "grid w-auto min-w-[500px] grid-cols-2 items-center pb-6 3xl:min-h-[106px] 3xl:min-w-0 3xl:grid-cols-1 3xl:pb-0",
        className,
      )}
    >
      <h2 className="font-semibold 3xl:hidden">{label}</h2>
      <div>{children}</div>
    </div>
  );
}
