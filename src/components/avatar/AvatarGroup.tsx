interface AvatarGroupProps {
  children: React.ReactNode;
}

export default function AvatarGroup({ children }: AvatarGroupProps) {
  return (
    <div className="left-28 col-span-2 ml-1 flex flex-wrap -space-x-2">
      {children}
    </div>
  );
}
