import Button from "@/components/Button";
import Badge from "@/components/badge/Badge";

interface ContributionCardProps {
  own_idea: boolean;
  contributed_by: {
    name: string;
    avatar?: string;
  };
  className?: string;
}

function ContributionCard({
  own_idea,
  contributed_by,
  className,
}: ContributionCardProps) {
  return (
    <div
      className={`card max-w-[200px] w-full max-[1919px]:min-w-[160px] h-fit bg-secondary-content rounded-lg ${className}`}
    >
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h1 className="text-base font-medium text-base-300">Contributed By</h1>
        <Badge data={contributed_by} />
        {own_idea ? (
          <Button variant="secondary" className="w-full">
            Edit Project
          </Button>
        ) : null}
      </section>
    </div>
  );
}

export default ContributionCard;
