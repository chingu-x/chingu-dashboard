"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { VoyageMember } from "@/store/features/ideation/ideationSlice";
import { useAppSelector } from "@/store/hooks";

interface ContributionCardProps {
  contributed_by: {
    member: VoyageMember;
  };
  projectIdeaId: number;
  className?: string;
}

function ContributionCard({
  contributed_by,
  className,
  projectIdeaId,
}: ContributionCardProps) {
  const { teamId } = useParams<{ teamId: string }>();
  const { id } = useAppSelector((state) => state.user);

  return (
    <div
      className={`card max-w-[200px] w-full max-[1919px]:min-w-[160px] h-fit bg-secondary-content rounded-lg ${className}`}
    >
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h1 className="text-base font-medium text-base-300">Contributed By</h1>
        <Badge data={contributed_by.member} />
        {contributed_by.member.id === id ? (
          <Link href={`/my-voyage/${teamId}/ideation/${projectIdeaId}/edit`}>
            <Button variant="secondary" className="w-full">
              Edit Project
            </Button>
          </Link>
        ) : null}
      </section>
    </div>
  );
}

export default ContributionCard;
