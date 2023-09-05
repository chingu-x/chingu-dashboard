import { Avatar, Button } from "@/components";

function ContributionCard() {
  return (
    <div className="card w-1/3 h-fit bg-accent-focus rounded-lg">
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h1 className="text-base font-medium text-neutral-focus">
          Contributed By
        </h1>
        <Avatar width={64} height={64} />
        <h2 className="text-xl font-semibold text-neutral-focus">Test User</h2>
        <Button
          title="Vote"
          customClassName="w-full bg-base-content text-neutral-focus border-primary"
        >
          Vote
        </Button>
      </section>
    </div>
  );
}

export default ContributionCard;
