import { Avatar, Button } from "@/components";

interface ContributionCardProps {
  own_idea: boolean;
  contributed_by: {
    name: string;
    avatar?: string;
  };
}

function ContributionCard({ own_idea, contributed_by }: ContributionCardProps) {
  return (
    <div className="card w-1/3 h-fit bg-secondary-content rounded-lg">
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h1 className="text-base font-medium text-base-300">
          Contributed By
        </h1>
        <Avatar width={64} height={64} image={contributed_by.avatar} />
        <h2 className="text-xl font-semibold text-base-300">
          {contributed_by.name}
        </h2>
        {own_idea ? (
          <Button
            title="Vote"
            customClassName="w-full btn-secondary text-base-300 "
          >
            Edit Project
          </Button>
        ) : null}
      </section>
    </div>
  );
}

export default ContributionCard;
