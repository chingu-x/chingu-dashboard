"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { currentUser } from "./TechStackContainer";
import { TeamTechStackItemVotes } from "./types/types";
import Button from "@/components/Button";
import { voteExistingTech, removeVote } from "@/api/routes";

interface VoteButtonProps {
  title: string;
  id: number;
  votedBy: TeamTechStackItemVotes[];
}

export default function VoteButton({ title, id, votedBy }: VoteButtonProps) {
  const [voted, setVoted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Check if currentUser.id is in the votedBy array
    const hasVoted: boolean = votedBy.some(
      (vote: TeamTechStackItemVotes) =>
        vote.votedBy.member.id === currentUser.id,
    );
    setVoted(hasVoted);
  }, [votedBy]);

  const onClick = async () => {
    if (!voted) {
      try {
        await voteExistingTech(currentUser.teamId, id, currentUser.id);
        setVoted(true);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    } else if (voted) {
      try {
        await removeVote(currentUser.teamId, id, currentUser.id);
        setVoted(false);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Button
      title={title}
      customClassName={`capitalize w-[62px] h-[32px] p-0 min-h-full text-xs font-medium text-base-300 border-transparent mr-4 rounded-[32px] hover:bg-primary hover:border-transparent gap-x-0 ${
        voted ? "bg-primary-focus" : "bg-primary-content"
      }`}
      onClick={onClick}
    >
      {voted ? "Voted" : "Vote"}
    </Button>
  );
}
