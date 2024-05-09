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
import { validateHeaderValue } from "http";

//map over manyVotes and assign testAvatar to Image in Avatar group to see behaviour with many votes.
const testAvatar =
  "https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=wavatar&r=x";
const manyVotes = ["", "", "", "", "", "", "", ""];

interface TechStackCardProps {
  title: string;
  data: TechStackItem[];
}

export default function TechStackCard({ title, data }: TechStackCardProps) {
  const [isInput, setIsInput] = useState(false);
  const [isEdiing, setIsEditing] = useState(-1);
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
    const editItemsValue = editRef.current?.value.toLowerCase();

    // Check for duplicates in both input fields
    const isDuplicateInAdding =
      addingItemValue && items.includes(addingItemValue);
    const isDuplicateInEdit = editItemsValue && items.includes(editItemsValue);

    // Update isDuplicate state based on duplicate status
    if (addingItemValue && isDuplicateInAdding !== isDuplicate) {
      setIsDuplicate(!!isDuplicateInAdding);
    }

    if (editItemsValue && isDuplicateInEdit !== isDuplicate) {
      setIsDuplicate(!!isDuplicateInEdit);
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
              {isEdiing === element.id && (
                <form className="col-span-4">
                  <TextInput
                    id={element.id.toString()}
                    ref={editRef}
                    placeholder={element.name}
                    submitButtonText="Save"
                    isClearBtnVisible={true}
                    errorMessage={isDuplicate ? "Duplicate Item" : ""}
                    clearInputAction={clearActionEditItem}
                    onChange={handleOnChange}
                  />
                </form>
              )}

              {isEdiing !== element.id && (
                <>
                  {/*item name*/}
                  {element.name}
                  {openMenuId === element.id && (
                    <SettingsMenu
                      onClose={handleSettingsMenuClose}
                      setIsEditing={setIsEditing}
                      id={element.id}
                    />
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
                  {/*TODO: At the moment it isn't possible for item to have 0 votes. Move Create AddVoteBtn version with ellipsis button to open SettingsMenu
                  and logic to render this where 0 votes.*/}
                  {element.teamTechStackItemVotes
                    .map((item) => item.votedBy.member.id)
                    .includes(userId) ? (
                    <RemoveVoteBtn />
                  ) : (
                    <AddVoteBtn id={element.id} openMenu={setOpenMenuId} />
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
          />
        </form>
      ) : (
        <Button
          variant="outline"
          className="justify-center w-full"
          onClick={toggleAddItemInput}
        >
          Add Tech Stack
        </Button>
      )}
    </div>
  );
}
