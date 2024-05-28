"use client";
import { useRef, useState, useEffect } from "react";
import type { FormEvent } from "react";
import GetIcon from "./GetIcons";
import AddVoteBtn from "./AddVoteBtn";
import RemoveVoteBtn from "./RemoveVoteBtn";
import TextInput from "@/components/inputs/TextInput";
import AvatarGroup from "@/components/avatar/AvatarGroup";
import Avatar from "@/components/avatar/Avatar";
import Button from "@/components/Button";
import type { TechStackItem } from "@/store/features/techStack/techStackSlice";
import { useUser } from "@/store/hooks";

interface TechStackCardProps {
  title: string;
  data: TechStackItem[];
}

export default function TechStackCard({ title, data }: TechStackCardProps) {
  const [isInput, setIsInput] = useState(false);
  const [isEditing, setIsEditing] = useState(-1);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const editRef = useRef<HTMLInputElement>(null);
  const items = data.map((item) => item.name.toLowerCase());
  const userId = useUser().id;
  const [openMenuId, setOpenMenuId] = useState(-1);

  const toggleAddItemInput = () => {
    setIsInput(!isInput);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleSettingsMenuClose = () => {
    setOpenMenuId(-1);
  };

  const clearActionEditItem = () => {
    setIsEditing(-1);
    setOpenMenuId(-1);
  };

  const clearActionAdditem = () => {
    setIsInput(!isInput);
  };

  const handleOnChange = () => {
    const addingItemValue = inputRef.current?.value.toLowerCase();

    const isDuplicateInAdding =
      addingItemValue && items.includes(addingItemValue);

    if (addingItemValue && isDuplicateInAdding !== isDuplicate) {
      setIsDuplicate(!!isDuplicateInAdding);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsInput(false);
      }
      if (editRef.current && !editRef.current.contains(event.target as Node)) {
        setIsEditing(-1);
        setOpenMenuId(-1);
      }
    }
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [isInput, isEditing]);

  return (
    <div className="card min-w-[420px] h-80 text-base-300 bg-base-200 rounded-lg px-6 py-5 sm:w-96">
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
              className="text-base mb-8 grid grid-cols-6 items-center relative "
              key={element.id}
            >
              {isEditing === element.id && (
                <form className="col-span-6 h-12 -my-2">
                  <TextInput
                    id={element.id.toString()}
                    ref={editRef}
                    placeholder={element.name}
                    submitButtonText="Save"
                    isClearBtnVisible={true}
                    clearInputAction={clearActionEditItem}
                    onChange={handleOnChange}
                  />
                </form>
              )}

              {isEditing !== element.id && (
                <>
                  {/*item name*/}
                  <p className="font-medium text-base leading-5">
                    {element.name}
                  </p>
                  {/*Avatars of voters*/}
                  <div className="ml-8 col-span-2 bg-base-200">
                    <AvatarGroup>
                      {element.teamTechStackItemVotes.map((vote) => (
                        <Avatar
                          key={vote.votedBy.member.id}
                          image={vote.votedBy.member.avatar}
                          width={24}
                          height={24}
                        />
                      ))}
                    </AvatarGroup>
                  </div>
                  {element.teamTechStackItemVotes
                    .map((item) => item.votedBy.member.id)
                    .includes(userId) ? (
                    <RemoveVoteBtn
                      id={element.id}
                      openMenu={setOpenMenuId}
                      numberOfVotes={element.teamTechStackItemVotes.length}
                      closeMenu={handleSettingsMenuClose}
                      setIsEditing={setIsEditing}
                      isMenuOpen={openMenuId}
                    />
                  ) : (
                    <AddVoteBtn />
                  )}
                </>
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
            clearInputAction={clearActionAdditem}
            onChange={handleOnChange}
            className="z-10"
          />
        </form>
      ) : (
        <div className="px-3.5 py-2.5">
          <Button
            variant="outline"
            className="justify-center w-full border-2"
            onClick={toggleAddItemInput}
          >
            Add Tech Stack
          </Button>
        </div>
      )}
    </div>
  );
}
