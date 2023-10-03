import { Avatar, Button } from "@/components";

interface ContributionCardProps {
  own_idea: boolean;
  contributed_by: {
    name: string;
    avatar?: string;
  };
  className?: string

}

function ContributionCard({ own_idea, contributed_by, className }: ContributionCardProps) {
  return (
    <div className={`card max-w-[200px] w-full max-[1919px]:max-w-[160px] h-fit bg-secondary-content rounded-lg ${className}`}>
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h1 className="text-base font-medium text-base-300">Contributed By</h1>
        <div className="flex bg-base-100 items-center rounded-[100px] h-[25px] gap-x-2 py-[3px] px-[9px]">
          <Avatar width={16} height={16} image={contributed_by.avatar} />
          <h2 className="text-base font-medium text-base-300 leading-[19px]">
            {contributed_by.name}
          </h2>
        </div>
        {own_idea ? (
          <Button
            title="Vote"
            customClassName="w-full btn-secondary text-base-300 capitalize"
          >
            Edit Project
          </Button>
        ) : null}
      </section>
    </div>
  );
}

export default ContributionCard;
