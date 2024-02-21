import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroup";
import Button from "@/components/Button";

interface VoteCardProps {
  users: string[];
  voted: boolean;
  className?: string;
}

function VoteCard({ users, voted, className }: VoteCardProps) {
  return (
    <div
      className={`card max-w-[200px] max-[1919px]:min-w-[160px] w-full h-fit bg-primary-content rounded-lg ${className}`}
    >
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h1 className="text-3xl font-semibold text-base-300">{users.length}</h1>
        <h2 className="text-xl font-semibold text-base-300">{`Vote${
          users.length > 1 ? "s" : ""
        }`}</h2>
        <AvatarGroup>
          {users.map((user) => (
            <Avatar width={24} height={24} key={user} />
          ))}
        </AvatarGroup>
        <Button className="w-full" disabled={voted}>
          {voted ? "Voted" : "Vote"}
        </Button>
      </section>
    </div>
  );
}

export default VoteCard;
