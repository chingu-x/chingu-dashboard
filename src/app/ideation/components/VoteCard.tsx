import { Avatar, Button } from "@/components";

interface VoteCardProps {
  users: string[];
  voted: boolean;
}

function VoteCard({ users, voted }: VoteCardProps) {
  return (
    <div className="card w-1/3 h-fit bg-base-content rounded-lg">
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h1 className="text-3xl font-semibold text-neutral-focus">
          {users.length}
        </h1>
        <h2 className="text-xl font-semibold text-neutral-focus">Votes</h2>
        <div className="avatar-group -space-x-2 w-full">
          {users.map((user) => (
            <Avatar width={24} height={24} key={user} />
          ))}
        </div>
        <Button
          title="Vote"
          customClassName="w-full bg-primary hover:bg-primary-focus disabled:bg-primary-focus disabled:text-base-content"
          disabled={voted}
        >
          {voted ? "Voted" : "Vote"}
        </Button>
      </section>
    </div>
  );
}

export default VoteCard;
