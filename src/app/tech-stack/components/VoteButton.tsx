"use client";

import { currentUser } from "./TechStackContainer";
import Button from "@/components/Button";

interface VoteButtonProps {
  title: string;
  id: number;
}

export default function VoteButton({ title, id }: VoteButtonProps) {

  const onClick = () => {
    console.log(id);
    console.log(currentUser.teamId);
    console.log(currentUser.id);
  };

  return (
    <Button
      title={title}
      customClassName="capitalize w-[62px] h-[32px] p-0 min-h-full text-xs font-medium text-base-300 bg-primary-content border-transparent mr-4 rounded-[32px] hover:bg-primary hover:border-transparent gap-x-0"
      onClick={onClick}
    >
    Vote
    </Button>
  );
}
