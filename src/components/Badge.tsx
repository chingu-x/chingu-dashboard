import Avatar from "./Avatar";

interface BadgeProps {
    data: {
    name: string;
    avatar?: string;
  };
}

function Badge({ data }: BadgeProps) {
  return (
    <div className="flex bg-base-100 items-center rounded-[100px] h-[25px] gap-x-2 py-[3px] px-[9px]">
      <Avatar width={16} height={16} image={data.avatar} />
      <h2 className="text-base font-medium text-base-300 leading-[19px]">
        {data.name}
      </h2>
    </div>
  );
}

export default Badge;
