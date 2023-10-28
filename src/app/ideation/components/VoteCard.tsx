"use client";

import { useCallback, useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { ProjectIdeaVotes } from "@/store/features/ideation/ideationSlice";

const USERID = "be650b1e-078a-4ebd-ad07-6a368d5f250a";

interface VoteCardProps {
  users: ProjectIdeaVotes[];
  className?: string;
}

function VoteCard({ users, className }: VoteCardProps) {
  const [currentUserVoted, setCurrentUserVoted] = useState(false);

  const getVoteUsers = useCallback(
    () => users.map((user) => user.votedBy.member.id),
    [users],
  );

  useEffect(() => {
    if (getVoteUsers().includes(USERID) === true) {
      setCurrentUserVoted(true);
    } else {
      setCurrentUserVoted(false);
    }

  }, [getVoteUsers]);

  return (
    <div
      className={`card max-w-[200px] max-[1919px]:min-w-[160px] w-full h-fit bg-primary-content rounded-lg ${className}`}
    >
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h1 className="text-3xl font-semibold text-base-300">{users.length}</h1>
        <h2 className="text-xl font-semibold text-base-300">{`Vote${
          users.length > 1 ? "s" : ""
        }`}</h2>
        <div className="avatar-group -space-x-2 w-full">
          {users.map((user) => (
            <Avatar width={24} height={24} key={user.id} image={user.votedBy.member.avatar} />
          ))}
        </div>
        <Button
          title="Vote"
          customClassName="w-full btn-primary text-base-300 disabled:bg-primary-focus disabled:text-base-200 capitalize"
          disabled={getVoteUsers().includes(USERID)}
          onClick={() => {}}
        >
          {currentUserVoted ? "Voted" : "Vote"}
        </Button>
      </section>
    </div>
  );
}

export default VoteCard;
