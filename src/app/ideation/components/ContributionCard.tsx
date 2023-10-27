import Button from "@/components/Button";
import Badge from "@/components/Badge";
import { useAppDispatch } from "@/store/hooks";
import { onOpen } from "@/store/features/modal/modalSlice";

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
  const dispatch = useAppDispatch();

  return (
    <div
      className={`card max-w-[200px] w-full max-[1919px]:min-w-[160px] h-fit bg-secondary-content rounded-lg ${className}`}
    >
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h1 className="text-base font-medium text-base-300">Contributed By</h1>
        <Badge data={contributed_by} />
        {own_idea ? (
          <Button
            title="Edit Project"
            type="button"
            onClick={() => dispatch(onOpen({ type: "ideation", mode: "edit" }))}
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
