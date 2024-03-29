interface AvatarGroupProps {
  children: React.ReactNode;
}

export default function AvatarGroup({ children }: AvatarGroupProps) {
  return <div className="flex -space-x-2 left-28">{children}</div>;
}
