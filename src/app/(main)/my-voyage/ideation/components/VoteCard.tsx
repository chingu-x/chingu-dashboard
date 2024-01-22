"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import {
  ProjectIdeaVotes,
  addVote,
} from "@/store/features/ideation/ideationSlice";
import { addIdeationVote } from "@/api/ideationService";

const USERID = "1bbd9ddb-f4b3-4e88-b2d8-fec82f653feb";

interface VoteCardProps {
  users: ProjectIdeaVotes[];
  className?: string;
}

function VoteCard({ users, className }: VoteCardProps) {
  const [currentUserVoted, setCurrentUserVoted] = useState(false);
  const dispatch = useDispatch();

  async function addProjectVote() {
    const data = await addIdeationVote({ teamId: 1, ideationId: 1 });

    dispatch(addVote(data));
  }

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
<<<<<<< HEAD:src/app/ideation/components/VoteCard.tsx
        <Button
          title="Vote"
          customClassName="w-full btn-primary text-base-300 disabled:bg-primary-focus disabled:text-base-200 capitalize"
          disabled={currentUserVoted}
          onClick={addProjectVote}
        >
          {currentUserVoted ? "Voted" : "Vote"}
=======
        <Button className="w-full" disabled={voted}>
          {voted ? "Voted" : "Vote"}
>>>>>>> c884e4f52381f98dab70da681daf7e3b8982ead5:src/app/(main)/my-voyage/ideation/components/VoteCard.tsx
        </Button>
      </section>
    </div>
  );
}

export default VoteCard;
