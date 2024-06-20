import { cn } from "@/lib/utils";

interface VoteDescriptionCardProps {
  className?: string;
}

function VoteDescriptionCard({ className }: VoteDescriptionCardProps) {
  return (
    <div className={cn("w-full rounded-lg bg-base-100", className)}>
      <section className="flex flex-col items-start gap-y-4 p-4">
        <h2 className="text-xl font-semibold leading-[24px] text-base-300">
          Votes
        </h2>
        <p className="text-left text-base font-medium leading-[19px] text-base-300">
          Vote for the projects you are interested in.
        </p>
      </section>
    </div>
  );
}

export default VoteDescriptionCard;
