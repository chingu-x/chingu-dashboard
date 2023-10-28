import Badge from "@/components/Badge";
import { VoyageMember } from "@/store/features/ideation/ideationSlice";

interface ContributionCardProps {
  contributed_by: {
    member: VoyageMember;
  };
  className?: string;
}

function ContributionCard({
  contributed_by,
  className,
}: ContributionCardProps) {
  return (
    <div
      className={`card max-w-[200px] w-full max-[1919px]:min-w-[160px] h-fit bg-secondary-content rounded-lg ${className}`}
    >
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h1 className="text-base font-medium text-base-300">Contributed By</h1>
        <Badge data={contributed_by.member} />
      </section>
    </div>
  );
}

export default ContributionCard;
