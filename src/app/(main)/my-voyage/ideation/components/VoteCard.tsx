"use client";

import { useCallback, useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import {
  ProjectIdeaVotes,
  addVote,
} from "@/store/features/ideation/ideationSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addIdeationVote,
  removeIdeationVote,
} from "@/app/(main)/my-voyage/ideation/ideationService";

interface VoteCardProps {
  projectIdeaId: number;
  users: ProjectIdeaVotes[];
  className?: string;
  teamId: number;
}

function VoteCard({ teamId, projectIdeaId, users, className }: VoteCardProps) {
  const [currentUserVoted, setCurrentUserVoted] = useState(false);
  const { id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  async function handleVote() {
    if (currentUserVoted) {
      await removeIdeationVote({ teamId, ideationId: projectIdeaId });
    } else {
      const data = await addIdeationVote({ teamId, ideationId: projectIdeaId });
      dispatch(addVote(data));
    }
  }

  const getVoteUsers = useCallback(
    () => users.map((user) => user.votedBy.member.id),
    [users]
  );

  useEffect(() => {
    if (getVoteUsers().includes(id) === true) {
      setCurrentUserVoted(true);
    } else {
      setCurrentUserVoted(false);
    }
  }, [id, getVoteUsers]);

  return (
    <div
      className={`card max-w-[200px] max-[1919px]:min-w-[160px] w-full h-fit bg-primary-content rounded-lg ${className}`}
    >
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h1 className="text-3xl font-semibold text-base-300">{users.length}</h1>
        <h2 className="text-xl font-semibold text-base-300">{`Vote${
          users.length > 1 ? "s" : ""
        }`}</h2>
        <div className="w-full -space-x-2 avatar-group">
          {users.map((user) => (
            <Avatar
              width={24}
              height={24}
              key={user.id}
              image={user.votedBy.member.avatar}
            />
          ))}
        </div>
        <Button
          type="submit"
          size="lg"
          variant="primary"
          className="w-full"
          onClick={handleVote}
        >
          {currentUserVoted ? "Remove Vote" : "Add Vote"}
        </Button>
      </section>
    </div>
  );
}

export default VoteCard;
