import { Avatar, Button } from "@/components";

function VoteCard() {
  return (
    <div className="card w-1/3 h-fit bg-base-content rounded-lg">
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h1 className="text-3xl font-semibold text-neutral-focus">4</h1>
        <h2 className="text-xl font-semibold text-neutral-focus">Votes</h2>
        <div>
          <Avatar width={24} height={24} />
        </div>
        <Button title="Vote" customClassName="w-full bg-primary">Vote</Button>
      </section>
    </div>
  );
}

export default VoteCard;
