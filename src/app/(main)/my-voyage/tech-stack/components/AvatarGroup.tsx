import type { TechItem } from "./fixtures/TechStack";
import Avatar from "@/components/Avatar";


interface AvatarGroupProps {
    data : TechItem["users"]
};

export default function AvatarGroup ( { data }: AvatarGroupProps) {
  return(
    <div className="absolute flex -space-x-2 avatar-group left-28">
      {/**Avatar image property will need to grab the avatar from each user
      * as is user array is a string of user's names in the mock data TechItem
      */}
      {data.map((index) => (
        <Avatar
          key={index}
          image={""}
          width={24}
          height={24}
        />
      ))}
    </div>
  );
};
