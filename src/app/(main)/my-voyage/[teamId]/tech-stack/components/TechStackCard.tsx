"use client";
import { useRef, useState, FormEvent } from "react";
import AvatarGroup from "@/components/avatar/AvatarGroup";
import Avatar from "@/components/avatar/Avatar";
import Button from "@/components/Button";
import { TechStackItem } from "@/store/features/techStack/techStackSlice";
import TextInput from "@/components/inputs/TextInput";
import { useUser } from "@/store/hooks";
import {
  ComputerDesktopIcon,
  SwatchIcon,
  CodeBracketSquareIcon,
  ChartPieIcon,
  CloudIcon,
  ServerStackIcon,
} from "@heroicons/react/24/solid";

interface TechStackCardProps {
  title: string;
  data: TechStackItem[];
}

export default function TechStackCard({ title, data }: TechStackCardProps) {
  const [isInput, setIsInput] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const items = data.map((item) => item.name.toLowerCase());
  const userId = useUser().id;

  function getIcon(cardTitle: string) {
    if (cardTitle === "Frontend") {
      return <ComputerDesktopIcon className="w-1/12 h-1/12 mr-2" />;
    }
    if (cardTitle === "CSS Library") {
      return <SwatchIcon className="w-1/12 h-1/12 mr-2" />;
    }
    if (cardTitle === "Backend") {
      return <CodeBracketSquareIcon className="w-1/12 h-1/12 mr-2" />;
    }
    if (cardTitle === "Project Management") {
      return <ChartPieIcon className="w-1/12 h-1/12 mr-2" />;
    }
    if (cardTitle === "Cloud Provider") {
      return <CloudIcon className="w-1/12 h-1/12 mr-2" />;
    }
    if (cardTitle === "Hosting") {
      return <ServerStackIcon className="w-1/12 h-1/12 mr-2" />;
    }
  }

  const toggleInput = () => {
    setIsInput(!isInput);
  };

  const clearAction = () => {
    setIsInput(!isInput);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleOnChange = () => {
    const currentValue = inputRef.current?.value.toLowerCase();
    if (currentValue && !isDuplicate) {
      items.includes(currentValue) ? setIsDuplicate(true) : null;
    }
    if (currentValue && isDuplicate) {
      items.includes(currentValue) ? null : setIsDuplicate(false);
    }
  };

  return (
    <div className="card min-w-[400px] sm:w-96 text-base-300 bg-base-200 rounded-lg px-6 py-5">
      <div className="flex flex-row justify-start">
        {getIcon(title)}
        <h3 className="self-center text-xl font-semibold text-base-300">
          {title}
        </h3>
      </div>
      <div className="h-40 pt-1 mt-6 overflow-y-auto">
        <ul className="text-base-300">
          {data.map((element) => (
            <li
              className="text-base mb-5 grid grid-cols-3 items-center"
              key={element.id}
            >
              {element.name}
              <AvatarGroup>
                {element.teamTechStackItemVotes.map((vote, index) => (
                  <Avatar
                    key={index}
                    image={vote.votedBy.member.avatar}
                    width={24}
                    height={24}
                  />
                ))}
              </AvatarGroup>
              {/*Check to see if current user has voted on item*/}
              {element.teamTechStackItemVotes
                .map((item) => item.votedBy.member.id)
                .includes(userId) ? (
                <Button
                  variant="error"
                  size="xs"
                  className="p-2 rounded-3xl last:justify-self-end "
                >
                  Remove Vote
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="xs"
                  className="rounded-3xl rounded-3xl last:justify-self-end "
                >
                  Add Vote
                </Button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {isInput ? (
        <form onSubmit={handleSubmit}>
          <TextInput
            id={title}
            ref={inputRef}
            placeholder="Add Tech Stack"
            submitButtonText="Save"
            errorMessage={isDuplicate ? "Duplicate Item" : ""}
            isClearBtnVisible={true}
            clearInputAction={clearAction}
            onChange={handleOnChange}
          />
        </form>
      ) : (
        <Button
          variant="outline"
          className="justify-center w-full"
          onClick={toggleInput}
        >
          Add Tech Stack
        </Button>
      )}
    </div>
  );
}
