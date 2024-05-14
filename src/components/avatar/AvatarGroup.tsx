interface AvatarGroupProps {
  children: React.ReactNode;
}

export default function AvatarGroup({ children }: AvatarGroupProps) {
  return (
    <div className="flex flex-wrap -space-x-2 ml-1 left-28 col-span-2 ">
      {children}
    </div>
  );
}
