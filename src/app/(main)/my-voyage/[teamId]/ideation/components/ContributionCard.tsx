"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Badge from "@/components/badge/Badge";
import Button from "@/components/Button";
import { type VoyageMember } from "@/store/features/ideation/ideationSlice";
import { useUser } from "@/store/hooks";
import { cn } from "@/lib/utils";
import routePaths from "@/utils/routePaths";

interface ContributionCardPropsBase {
  className?: string;
  contributed_by: {
    member: VoyageMember;
  };
  isIdeationFinalized: boolean;
}

interface IdeationFinalizedProps {
  isIdeationFinalized: true;
  projectIdeaId?: number;
}

interface IdeationNotFinalizedProps {
  isIdeationFinalized: false;
  projectIdeaId: number;
}

type ContributionCardProps = ContributionCardPropsBase &
  (IdeationFinalizedProps | IdeationNotFinalizedProps);

export default function ContributionCard({
  contributed_by,
  className,
  projectIdeaId,
  isIdeationFinalized,
}: ContributionCardProps) {
  const { teamId } = useParams<{ teamId: string }>();
  const { id } = useUser();
  const [ownVote, setOwnVote] = useState<boolean>(false);
  const { member } = contributed_by;

  useEffect(() => {
    if (member.id === id) {
      setOwnVote(true);
    }
  }, [member, id]);

  return (
    <div className={cn("w-[200px] bg-base-100 rounded-lg", className)}>
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h1 className="text-base font-medium text-base-300">Contributed By</h1>
        <Badge title={member.firstName} avatarUrlImage={member.avatar} />
        {ownVote && !isIdeationFinalized ? (
          <Link
            href={routePaths.editIdeationPage(teamId, projectIdeaId.toString())}
            className="w-full"
          >
            <Button variant="outline" className="w-full">
              Edit Project
            </Button>
          </Link>
        ) : null}
      </section>
    </div>
  );
}
