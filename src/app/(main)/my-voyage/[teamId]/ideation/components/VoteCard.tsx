"use client";

import { useCallback, useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import {
  ProjectIdeaVotes,
  addVote,
  removeVote,
} from "@/store/features/ideation/ideationSlice";
import { useAppSelector } from "@/store/hooks";
import Spinner from "@/components/Spinner";
import { cn } from "@/lib/utils";
import useThunk from "@/hooks/useThunk";

interface VoteCardProps {
  projectIdeaId: number;
  users: ProjectIdeaVotes[];
  className?: string;
  teamId: number;
}

function VoteCard({ teamId, projectIdeaId, users, className }: VoteCardProps) {
  const [currentUserVoted, setCurrentUserVoted] = useState<null | boolean>(
    null
  );
  const { id } = useAppSelector((state) => state.user);
  const { loading } = useAppSelector((state) => state.ideation);
  // const dispatch = useAppDispatch();
  const {
    runThunk: addVoteThunk,
    isLoading: addVoteLoading,
    // error: editError,
  } = useThunk(addVote);
  const {
    runThunk: removeVoteThunk,
    isLoading: removeVoteLoading,
    // error: editError,
  } = useThunk(removeVote);

  function handleVote() {
    if (currentUserVoted) {
      removeVoteThunk({ teamId, ideationId: projectIdeaId, id });
      // void dispatch(removeVote({ teamId, ideationId: projectIdeaId, id }));
    } else {
      // addVoteAction({ teamId, ideationId: projectIdeaId });
      addVoteThunk({ teamId, ideationId: projectIdeaId });
    }
  }

  const getVoteUsers = useCallback(
    () => users.map((user) => user.votedBy.member.id),
    [users]
  );

  function buttonContent() {
    if (addVoteLoading || removeVoteLoading || loading) {
      return <Spinner />;
    }

    if (currentUserVoted) {
      return "Remove Vote";
    } else {
      return "Add Vote";
    }
  }

  useEffect(() => {
    if (getVoteUsers().includes(id) === true) {
      setCurrentUserVoted(true);
    } else {
      setCurrentUserVoted(false);
    }
  }, [id, getVoteUsers]);

  return (
    <div className={cn("w-full bg-primary-content rounded-lg", className)}>
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
        {currentUserVoted !== null ? (
          <Button
            type="submit"
            size="lg"
            variant="primary"
            className="w-full"
            onClick={handleVote}
          >
            {buttonContent()}
          </Button>
        ) : null}
      </section>
    </div>
  );
}

export default VoteCard;
