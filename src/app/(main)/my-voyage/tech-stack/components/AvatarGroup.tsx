import type { TechItem } from "./fixtures/TechStack";
import Avatar from "@/components/Avatar";
import myAvatar from "@/public/img/avatar.png"; //temp until BE has data equal to fixtures/TechStacks.ts

interface AvatarGroupProps {
    data : TechItem["users"]
};

export default function AvatarGroup ( { data }: AvatarGroupProps) {
  return(
    <div className="absolute flex -space-x-2 avatar-group left-28">
      {/**<Avatar /> image property will need to point at the 
      * avatar property on each user in array of users (the data passed into <AvatarGroup/>).
      * As is, array of users from fixtures/TechStack is an array of names (string).
        Something like the following will be needed...
        data.map((user, index) =>(
        <Avatar
          key={index}
          image={user.avatar}
          width={24}
          height={24}
        />  
        ))
      */}
      {data.map((index) => (
        <Avatar
          key={index}
          image={myAvatar}
          width={24}
          height={24}
        />
      ))}
    </div>
  );
};
