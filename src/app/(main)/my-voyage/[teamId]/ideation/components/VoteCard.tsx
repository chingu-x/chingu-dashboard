"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import Button from "@/components/Button";
import { type ProjectIdeaVotes } from "@/store/features/ideation/ideationSlice";
import { useAppDispatch, useUser } from "@/store/hooks";
import Spinner from "@/components/Spinner";
import { cn } from "@/lib/utils";
import useServerAction from "@/hooks/useServerAction";
import {
  addIdeationVote,
  removeIdeationVote,
} from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import AvatarGroup from "@/components/avatar/AvatarGroup";
import Avatar from "@/components/avatar/Avatar";

interface VoteCardProps {
  projectIdeaId: number;
  users: ProjectIdeaVotes[];
  className?: string;
}

function VoteCard({ projectIdeaId, users, className }: VoteCardProps) {
  const [currentUserVoted, setCurrentUserVoted] = useState<null | boolean>(
    null,
  );
  const [isPending, startTransition] = useTransition();
  const { id } = useUser();
  const dispatch = useAppDispatch();

  const {
    runAction: addIdeationVoteAction,
    isLoading: addIdeationVoteLoading,
    // setIsLoading: setAddIdeationVoteLoading,
  } = useServerAction(addIdeationVote);

  const {
    runAction: removeIdeationVoteAction,
    isLoading: removeIdeationVoteLoading,
    // setIsLoading: setRemoveIdeationVoteLoading,
  } = useServerAction(removeIdeationVote);

  function handleVote() {
    if (currentUserVoted) {
      startTransition(async () => {
        const [, error] = await removeIdeationVoteAction({
          ideationId: projectIdeaId,
        });

        if (error) {
          dispatch(
            onOpenModal({ type: "error", content: { message: error.message } }),
          );
        }
      });

      // setTimeout(() => {
      //   setRemoveIdeationVoteLoading(false);
      // }, 2000);
    } else {
      startTransition(async () => {
        const [, error] = await addIdeationVoteAction({
          ideationId: projectIdeaId,
        });

        if (error) {
          dispatch(
            onOpenModal({ type: "error", content: { message: error.message } }),
          );
        }
      });

      // setTimeout(() => {
      //   setAddIdeationVoteLoading(false);
      // }, 2000);
    }
  }

  const getVoteUsers = useCallback(
    () => users.map((user) => user.votedBy.member.id),
    [users],
  );

  function buttonContent() {
    if (isPending) {
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
    <div className={cn("w-[200px] rounded-lg bg-base-100", className)}>
      <section className="flex flex-col items-start gap-y-4 p-4">
        <h1 className="text-3xl font-semibold text-base-300">{users.length}</h1>
        <h2 className="text-xl font-semibold text-base-300">{`Vote${
          users.length > 1 ? "s" : ""
        }`}</h2>
        <AvatarGroup>
          {users.map((user) => (
            <Avatar
              width={24}
              height={24}
              key={user.id}
              image={user.votedBy.member.avatar}
            />
          ))}
        </AvatarGroup>
        <Button
          type="submit"
          size="lg"
          variant={`${currentUserVoted ? "error" : "primary"}`}
          className={`w-full ${currentUserVoted ? "text-base-300" : ""}`}
          onClick={handleVote}
          disabled={isPending}
        >
          {buttonContent()}
        </Button>
      </section>
    </div>
  );
}

export default VoteCard;
