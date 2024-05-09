"use client";
import { useRef, useState, FormEvent } from "react";
import AvatarGroup from "@/components/avatar/AvatarGroup";
import Avatar from "@/components/avatar/Avatar";
import Button from "@/components/Button";
import { TechStackItem } from "@/store/features/techStack/techStackSlice";
import GetIcon from "./GetIcons";
import TextInput from "@/components/inputs/TextInput";
import AddVoteBtn from "./AddVoteBtn";
import RemoveVoteBtn from "./RemoveVoteBtn";
import SettingsMenu from "./SettingsMenu";
import { useUser } from "@/store/hooks";

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
  const [openMenuId, setOpenMenuId] = useState(-1);

  const toggleInput = () => {
    setIsInput(!isInput);
  };

  const clearAction = () => {
    setIsInput(!isInput);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleMenuClose = () => {
    setOpenMenuId(-1);
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
        {GetIcon(title)}
        <h3 className="self-center text-xl font-semibold text-base-300">
          {title}
        </h3>
      </div>

      <div className="h-40 pt-1 mt-6 overflow-y-auto">
        <ul className="text-base-300">
          {data.map((element) => (
            <li
              className="text-base mb-5 grid grid-cols-4 items-center relative"
              key={element.id}
            >
              {/*item name*/}
              {element.name}
              {openMenuId === element.id && (
                <SettingsMenu onClose={handleMenuClose} />
              )}

              {/*Avatars of voters*/}
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

              {/*Render corrrect button type based on 0 votes, 1+ votes or if current user has voted on item.*/}
              {/*TODO: At the moment it isn't possible for item to have 0 votes. AddVoteBtn with ellipsis is 'hardwritten' here. 
              change to condition once 0 votes is possible */}
              {element.teamTechStackItemVotes
                .map((item) => item.votedBy.member.id)
                .includes(userId) ? (
                <RemoveVoteBtn />
              ) : (
                <AddVoteBtn id={element.id} openMenu={setOpenMenuId} />
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
