"use client";

import { useCallback, useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { AppError } from "@/types/types";
import {
  ProjectIdeaVotes,
  setLoadingTrue,
} from "@/store/features/ideation/ideationSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ErrorModal from "@/components/modals/ErrorModal";
import Spinner from "@/components/Spinner";
import { cn } from "@/lib/utils";
import useAction from "@/hooks/useAction";
import {
  addIdeationVote,
  removeIdeationVote,
} from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";

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
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const {
    runAction: addIdeationVoteAction,
    isLoading: addIdeationVoteLoading,
    setIsLoading: setAddIdeationVoteLoading,
  } = useAction(addIdeationVote);

  const {
    runAction: removeIdeationVoteAction,
    isLoading: removeIdeationVoteLoading,
    setIsLoading: setRemoveIdeationVoteLoading,
  } = useAction(removeIdeationVote);

  async function handleVote() {
    if (currentUserVoted) {
      dispatch(setLoadingTrue());
      await removeIdeationVoteAction({
        teamId,
        ideationId: projectIdeaId,
      }).then((res) => {
        if ((res as AppError).error) {
          setError((res as AppError).error);
          setIsOpen(true);
          setRemoveIdeationVoteLoading(false);
        }

        setRemoveIdeationVoteLoading(false);
      });
    } else {
      dispatch(setLoadingTrue());
      await addIdeationVoteAction({ teamId, ideationId: projectIdeaId }).then(
        (res) => {
          if ((res as AppError).error) {
            setError((res as AppError).error);
            setIsOpen(true);
            setAddIdeationVoteLoading(false);
          }

          setAddIdeationVoteLoading(false);
        }
      );
    }
  }

  const getVoteUsers = useCallback(
    () => users.map((user) => user.votedBy.member.id),
    [users]
  );

  function handleClose() {
    setIsOpen(false);
    setError(undefined);
  }

  function buttonContent() {
    if (addIdeationVoteLoading || removeIdeationVoteLoading || loading) {
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
    <>
      <ErrorModal
        isOpen={isOpen}
        handleClose={handleClose}
        errorMessage={error!}
      />
      <div className={cn("w-full bg-primary-content rounded-lg", className)}>
        <section className="flex flex-col items-start p-4 gap-y-4">
          <h1 className="text-3xl font-semibold text-base-300">
            {users.length}
          </h1>
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
              disabled={addIdeationVoteLoading || removeIdeationVoteLoading}
            >
              {buttonContent()}
            </Button>
          ) : null}
        </section>
      </div>
    </>
  );
}

export default VoteCard;
