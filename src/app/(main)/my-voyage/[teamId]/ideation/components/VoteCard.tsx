"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "@/components/Button";
import {
  type ProjectIdeaVotes,
  setProjectIdeasLoadingTrue,
} from "@/store/features/ideation/ideationSlice";
import { useAppDispatch, useIdeation, useModal, useUser } from "@/store/hooks";
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
import Tooltip from "@/components/Tooltip";

interface VoteCardProps {
  projectIdeaId: number;
  users: ProjectIdeaVotes[];
  className?: string;
}

function VoteCard({ projectIdeaId, users, className }: VoteCardProps) {
  const [currentUserVoted, setCurrentUserVoted] = useState<null | boolean>(
    null,
  );
  const { id } = useUser();
  const { loading } = useIdeation();
  const { isOpen } = useModal();
  const dispatch = useAppDispatch();
  const [voteChanged, setVoteChanged] = useState<boolean>(false);
  const [tooltipHovered, setTooltipHovered] = useState<string>("");

  const {
    runAction: addIdeationVoteAction,
    isLoading: addIdeationVoteLoading,
    setIsLoading: setAddIdeationVoteLoading,
  } = useServerAction(addIdeationVote);

  const {
    runAction: removeIdeationVoteAction,
    isLoading: removeIdeationVoteLoading,
    setIsLoading: setRemoveIdeationVoteLoading,
  } = useServerAction(removeIdeationVote);

  async function handleVote() {
    if (currentUserVoted) {
      dispatch(setProjectIdeasLoadingTrue());

      const [, error] = await removeIdeationVoteAction({
        ideationId: projectIdeaId,
      });

      if (error) {
        dispatch(
          onOpenModal({ type: "error", content: { message: error.message } }),
        );
      }

      setVoteChanged(true);
      setRemoveIdeationVoteLoading(false);
    } else {
      dispatch(setProjectIdeasLoadingTrue());
      const [, error] = await addIdeationVoteAction({
        ideationId: projectIdeaId,
      });

      if (error) {
        dispatch(
          onOpenModal({ type: "error", content: { message: error.message } }),
        );
      }

      setVoteChanged(true);
      setAddIdeationVoteLoading(false);
    }
  }

  const getVoteUsers = useCallback(
    () => users.map((user) => user.votedBy.member.id),
    [users],
  );

  function buttonContent() {
    if (
      addIdeationVoteLoading ||
      removeIdeationVoteLoading ||
      (loading && voteChanged)
    ) {
      return <Spinner />;
    }

    if (currentUserVoted) {
      return "Remove Vote";
    } else {
      return "Add Vote";
    }
  }

  useEffect(() => {
    if (isOpen === false) {
      setAddIdeationVoteLoading(false);
      setRemoveIdeationVoteLoading(false);
      setVoteChanged(false);
    }
  }, [isOpen, setAddIdeationVoteLoading, setRemoveIdeationVoteLoading]);

  useEffect(() => {
    if (voteChanged && !loading) {
      setVoteChanged(false);
    }
  }, [voteChanged, loading]);

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
            <Tooltip
              key={user.votedBy.member.id}
              content={`${user.votedBy.member.firstName}`}
              customClassName="text-xs font-medium w-fit"
              position="bottom"
              tooltipWidth="small"
              isDisplay={tooltipHovered === user.votedBy.member.id}
              hovered={tooltipHovered === user.votedBy.member.id}
            >
              <Avatar
                customClassName="border border-base-content"
                width={24}
                height={24}
                image={user.votedBy.member.avatar}
                onMouseEnter={() => {
                  setTooltipHovered(user.votedBy.member.id);
                }}
                onMouseLeave={() => {
                  setTooltipHovered("");
                }}
              />
            </Tooltip>
          ))}
        </AvatarGroup>
        <Button
          type="submit"
          size="lg"
          variant={`${currentUserVoted ? "error" : "primary"}`}
          className={`w-full ${currentUserVoted ? "text-base-300" : ""}`}
          onClick={handleVote}
          disabled={addIdeationVoteLoading || removeIdeationVoteLoading}
        >
          {buttonContent()}
        </Button>
      </section>
    </div>
  );
}

export default VoteCard;
