"use client";
import { useRef, useState, useEffect, useMemo } from "react";
import type { FormEvent } from "react";
import { useParams } from "next/navigation";
import GetIcon from "./GetIcons";
import AddVoteBtn from "./AddVoteBtn";
import RemoveVoteBtn from "./RemoveVoteBtn";
import SettingsMenu from "./SettingsMenu";
import {
  addTechItem,
  editTechItem,
} from "@/myVoyage/tech-stack/techStackService";
import getTechCategory from "@/myVoyage/tech-stack/components/getTechCategory";
import TextInput from "@/components/inputs/TextInput";
import AvatarGroup from "@/components/avatar/AvatarGroup";
import Avatar from "@/components/avatar/Avatar";
import Button from "@/components/Button";
import type { TechStackItem } from "@/store/features/techStack/techStackSlice";
import { useUser, useAppDispatch, useAppSelector } from "@/store/hooks";
import useServerAction from "@/hooks/useServerAction";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import Spinner from "@/components/Spinner";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

interface TechStackCardProps {
  title: string;
  data: TechStackItem[];
}

export default function TechStackCard({ title, data }: TechStackCardProps) {
  const [isInput, setIsInput] = useState(false);
  const [editItemId, setEditItemId] = useState(-1);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const editRef = useRef<HTMLInputElement>(null);
  const items = data.map((item) => item.name.toLowerCase());
  const params = useParams<{ teamId: string }>();
  const teamId = Number(params.teamId);
  const userId = useUser().id;

  //voyageTeamMembers, currentTeam and voyageTeamMemberId are all used to get
  //TODO: create hook or find simpler more readble way to get voyageTeamMemberId?
  const voyageTeamMembers = useAppSelector(
    (state) => state.user?.voyageTeamMembers || [],
  );
  const currentTeam = useMemo(
    () =>
      voyageTeamMembers.filter(
        (team) =>
          team.voyageTeam.voyage.status.name === "Active" &&
          team.voyageTeamId === teamId,
      ),
    [voyageTeamMembers, teamId],
  );
  const voyageTeamMemberId = currentTeam.length > 0 ? currentTeam[0].id : -1;

  const [openMenuId, setOpenMenuId] = useState(-1);
  const techCategoryId = getTechCategory(title) ?? 0;
  const dispatch = useAppDispatch();

  const {
    runAction: addTechItemAction,
    isLoading: addTechItemLoading,
    setIsLoading: setAddTechItemLoading,
  } = useServerAction(addTechItem);

  const {
    runAction: editTechItemAction,
    isLoading: editTechItemLoading,
    setIsLoading: setEditTechItemLoading,
  } = useServerAction(editTechItem);

  const toggleAddItemInput = () => {
    setIsInput(!isInput);
  };

  const handleAddItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const techName = inputRef.current?.value ?? "";
    const [, error] = await addTechItemAction({
      teamId,
      techName,
      techCategoryId,
      voyageTeamMemberId,
    });
    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    }
    setAddTechItemLoading(false);
    setIsInput(false);
  };

  const handleEdit = async (
    e: FormEvent<HTMLFormElement>,
    techItemId: number,
  ) => {
    e?.preventDefault();
    const techName = editRef.current?.value ?? "";
    const [, error] = await editTechItemAction({
      techItemId,
      techName,
    });

    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    }
    setEditTechItemLoading(false);
    setEditItemId(-1);
    handleSettingsMenuClose();
  };

  const handleSettingsMenuClose = () => {
    setOpenMenuId(-1);
  };

  const clearActionEditItem = () => {
    setEditItemId(-1);
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
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (editRef.current) {
      editRef.current.focus();
    }
  }, [isInput, editItemId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const targetNode = event.target as Node;
      if (
        inputRef.current &&
        !inputRef.current.contains(targetNode) &&
        !(targetNode instanceof HTMLElement && targetNode.closest("form"))
      ) {
        setIsInput(false);
      }
      if (
        editRef.current &&
        !editRef.current.contains(targetNode) &&
        !(targetNode instanceof HTMLElement && targetNode.closest("form"))
      ) {
        setEditItemId(-1);
        setOpenMenuId(-1);
      }
    }
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [isInput, editItemId]);

  return (
    <div className="h-80 min-w-[420px] rounded-lg bg-base-200 p-5 text-base-300 sm:w-96">
      <div className="flex flex-row justify-start">
        {GetIcon(title)}
        <span className="self-center text-xl font-semibold text-base-300">
          {title}
        </span>
      </div>

      <div className="mt-6 h-40 overflow-y-auto p-1">
        <ul className="text-base-300">
          {data.map((element) => {
            const voteIsSubmitted = element.teamTechStackItemVotes.find(
              (item) => item.votedBy.member.id === userId,
            );
            return (
              <li
                className="relative mb-8 mr-2 grid grid-cols-6 items-center text-base"
                key={element.id}
              >
                {editItemId === element.id ? (
                  <form
                    onSubmit={(e) => handleEdit(e, element.id)}
                    className="col-span-6 -my-2 h-12"
                  >
                    <TextInput
                      id={element.id.toString()}
                      ref={editRef}
                      placeholder={element.name}
                      defaultValue={element.name}
                      submitButtonText={
                        editTechItemLoading ? <Spinner /> : "Save"
                      }
                      clearInputAction={clearActionEditItem}
                      onChange={handleOnChange}
                    />
                  </form>
                ) : (
                  <>
                    {/*item name*/}
                    <p className="text-base font-medium leading-5">
                      {element.name}
                    </p>
                    {/*Avatars of voters*/}
                    <div className="col-span-2 ml-8 bg-base-200">
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
                    {/**add vote or remove vote buttons*/}
                    {voteIsSubmitted ? (
                      <div className="relative col-span-2 flex w-[165px] items-center justify-end">
                        {element.teamTechStackItemVotes.length < 2 && (
                          <div className="h-1/6 w-1/6">
                            <EllipsisVerticalIcon
                              className="mr-2 rounded-xl hover:cursor-pointer hover:bg-base-100"
                              onClick={() => setOpenMenuId(element.id)}
                            />
                            {openMenuId === element.id && (
                              <SettingsMenu
                                onClose={handleSettingsMenuClose}
                                setEditItemId={setEditItemId}
                                id={element.id}
                              />
                            )}
                          </div>
                        )}
                        <RemoveVoteBtn id={element.id} />
                      </div>
                    ) : (
                      <AddVoteBtn />
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      {isInput ? (
        <form onSubmit={handleAddItem}>
          <TextInput
            id={title}
            ref={inputRef}
            placeholder="Add Tech Stack"
            submitButtonText={addTechItemLoading ? <Spinner /> : "Save"}
            errorMessage={isDuplicate ? "Duplicate Item" : ""}
            clearInputAction={clearActionAdditem}
            onChange={handleOnChange}
            className="z-10"
          />
        </form>
      ) : (
        <div className="px-3.5 py-2.5">
          <Button
            variant="outline"
            className="w-full justify-center border-2"
            onClick={toggleAddItemInput}
          >
            Add Tech Stack
          </Button>
        </div>
      )}
    </div>
  );
}
