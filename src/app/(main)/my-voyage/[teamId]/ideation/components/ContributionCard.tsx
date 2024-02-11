"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { VoyageMember } from "@/store/features/ideation/ideationSlice";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";

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
  const [ownVote, setOwnVote] = useState(false);

  useEffect(() => {
    if (contributed_by.member.id === id) {
      setOwnVote(true);
    }
  }, [contributed_by, id]);

  return (
    <div className={cn("w-full bg-secondary-content rounded-lg", className)}>
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h1 className="text-base font-medium text-base-300">Contributed By</h1>
        <Badge data={contributed_by.member} />
        {ownVote ? (
          <Link
            href={`/my-voyage/${teamId}/ideation/${projectIdeaId}/edit`}
            className="w-full"
          >
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
