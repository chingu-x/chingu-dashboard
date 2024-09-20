"use client";
import { useRef, useState, useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import * as z from "zod";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";
import { validateTextInput } from "@/utils/form/validateInput";
import Tooltip from "@/components/Tooltip";

interface TechStackCardProps {
  title: string;
  data: TechStackItem[];
}

const validationSchemaAdd = z.object({
  add: validateTextInput({
    inputName: "new item",
    required: true,
  }),
});

const validationSchemaEdit = z.object({
  edit: validateTextInput({
    inputName: "edit item",
    required: true,
  }),
});

type ValidationSchemaAdd = z.infer<typeof validationSchemaAdd>;
type ValidationSchemaEdit = z.infer<typeof validationSchemaEdit>;

export default function TechStackCard({ title, data }: TechStackCardProps) {
  const [isInput, setIsInput] = useState(false);
  const [editItemId, setEditItemId] = useState(-1);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [tooltipHovered, setTooltipHovered] = useState<string>("");

  const inputRef = useRef<HTMLFormElement>(null);
  const editRef = useRef<HTMLFormElement>(null);
  const items = data.map((item) => item.name.toLowerCase());
  const params = useParams<{ teamId: string }>();
  const teamId = Number(params.teamId);
  const userId = useUser().id;
  const user = useAppSelector((state) => state.user);
  const { voyageTeamMemberId } = getCurrentVoyageTeam({
    teamId,
    user,
    error: null,
  });
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSchemaAdd>({
    mode: "onSubmit",
    resolver: zodResolver(validationSchemaAdd),
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
  } = useForm<ValidationSchemaEdit>({
    mode: "onSubmit",
    resolver: zodResolver(validationSchemaEdit),
  });

  const toggleAddItemInput = () => {
    setIsInput(!isInput);
  };

  const handleAddItem: SubmitHandler<ValidationSchemaAdd> = async (data) => {
    const techName = data.add;
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
    reset();
  };

  const handleEdit = async (techItemId: number) => {
    const input = editRef?.current?.querySelector(
      "input[name='edit']",
    ) as HTMLInputElement;
    const techName = input.value ?? "";
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
    resetEdit();
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

  const checkIfDuplicate = () => {
    let newItem;
    const input = inputRef?.current?.querySelector(
      "input[name='add']",
    ) as HTMLInputElement;
    if (input) {
      newItem = input.value.toLowerCase();
      if (items.includes(newItem)) {
        return setIsDuplicate(true);
      }
    }
    return setIsDuplicate(false);
  };

  const errorMessage = () => {
    if (isDuplicate) {
      return "Duplicate Item";
    } else if (errors?.add?.message && errors) {
      return errors.add.message;
    }
  };

  useEffect(() => {
    const input = inputRef?.current?.querySelector(
      "input[name='add']",
    ) as HTMLInputElement;
    const edit = editRef?.current?.querySelector(
      "input[name='edit']",
    ) as HTMLInputElement;

    if (input) {
      input.focus();
    }
    if (edit) {
      edit.focus();
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
        reset();
      }
      if (
        editRef.current &&
        !editRef.current.contains(targetNode) &&
        !(targetNode instanceof HTMLElement && targetNode.closest("form"))
      ) {
        setEditItemId(-1);
        setOpenMenuId(-1);
        resetEdit();
      }
    }
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [isInput, editItemId, reset, resetEdit]);

  return (
    <div className="h-80 min-w-[420px] rounded-lg bg-base-200 p-5 text-base-300 sm:w-96">
      <div className="flex flex-row justify-start">
        {GetIcon(title)}
        <span className="self-center text-xl font-semibold text-base-300">
          {title}
        </span>
      </div>
      {/**TODO Refactor this beast into smaller more module pieces. */}
      <div className="h-40 p-1 mt-6 overflow-y-auto">
        <ul className="text-base-300">
          {data.map((element) => {
            const voteIsSubmitted = element.teamTechStackItemVotes.find(
              (item) => item.votedBy.member.id === userId,
            );
            return (
              <li
                className="relative grid items-center grid-cols-6 mb-8 mr-2 text-base"
                key={element.id}
              >
                {editItemId === element.id ? (
                  <form
                    onSubmit={handleSubmitEdit(() => handleEdit(element.id))}
                    className="h-12 col-span-6 -my-2"
                    ref={editRef}
                  >
                    <TextInput
                      id={element.id.toString()}
                      placeholder={element.name}
                      defaultValue={element.name}
                      submitButtonText={
                        editTechItemLoading ? <Spinner /> : "Save"
                      }
                      clearInputAction={clearActionEditItem}
                      {...registerEdit("edit")}
                      errorMessage={errorsEdit.edit?.message}
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
                          <Tooltip
                            key={vote.votedBy.member.id}
                            content={`${vote.votedBy.member.firstName}`}
                            customClassName="text-xs font-medium w-fit"
                            position="bottom"
                            tooltipWidth="small"
                            isDisplay={
                              tooltipHovered ===
                              element.id + vote.votedBy.member.id
                            }
                            hovered={
                              tooltipHovered ===
                              element.id + vote.votedBy.member.id
                            }
                          >
                            <Avatar
                              image={vote.votedBy.member.avatar}
                              width={24}
                              height={24}
                              onMouseEnter={() => {
                                setTooltipHovered(
                                  element.id + vote.votedBy.member.id,
                                );
                              }}
                              onMouseLeave={() => {
                                setTooltipHovered("");
                              }}
                            />
                          </Tooltip>
                        ))}
                      </AvatarGroup>
                    </div>
                    {/**add vote or remove vote buttons*/}
                    {voteIsSubmitted ? (
                      <div className="relative col-span-2 flex w-[180px] items-center justify-end">
                        {element.teamTechStackItemVotes.length < 2 && (
                          <div className="w-1/6 h-1/6">
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
                        <RemoveVoteBtn techItemId={element.id} />
                      </div>
                    ) : (
                      <AddVoteBtn techItemId={element.id} />
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {isInput ? (
        <form ref={inputRef} onSubmit={handleSubmit(handleAddItem)}>
          <TextInput
            id="add"
            placeholder="Add Tech Stack"
            submitButtonText={addTechItemLoading ? <Spinner /> : "Save"}
            clearInputAction={clearActionAdditem}
            className="z-10"
            {...register("add")}
            onChange={checkIfDuplicate}
            errorMessage={errorMessage()}
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
