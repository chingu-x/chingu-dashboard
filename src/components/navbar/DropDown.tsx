"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import DropDownLink from "./DropDownLink";
import Button from "@/components/Button";
import { useAppDispatch, useUser } from "@/store/hooks";
import { clientSignOut } from "@/store/features/auth/authSlice";
import { serverSignOut } from "@/app/(auth)/authService";
import { onOpenModal } from "@/store/features/modal/modalSlice";

export default function DropDown({ openState }: { openState?: boolean }) {
  const dispatch = useAppDispatch();
  const allVoyages = useUser().voyageTeamMembers;
  const activeVoyage = allVoyages?.find(
    (item) => item.voyageTeam.voyage.status.name === "Active",
  );
  const currentVoyage =
    activeVoyage?.voyageTeam.name ??
    "Please join a voyage to see your status information.";
  const closed = "hidden";
  const open =
    "absolute z-[1] w-44 p-4 [&>*]:mt-2 mt-6 shadow bg-base-100 right-0 border border-neutral rounded-2xl";

  async function handleClick() {
    const [res, error] = await serverSignOut();

    if (res) {
      dispatch(clientSignOut());
    }

    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    }
  }

  const handleDropDownClick = (event: React.MouseEvent<HTMLUListElement>) => {
    event.stopPropagation();
  };

  return (
    <div className="relative mx-2 py-0">
      <label
        tabIndex={0}
        className="m-0 flex border-none bg-transparent p-0 text-base-300 hover:border-none hover:bg-transparent"
      >
        <ChevronDownIcon className="w-4 cursor-pointer text-base-300" />
      </label>
      <ul
        tabIndex={0}
        className={openState ? open : closed}
        onClick={handleDropDownClick}
      >
        <li className="rounded-lg bg-secondary-content p-2 text-xs [&>*]:m-1">
          <p className="text-xs text-neutral">My Status:</p>
          {currentVoyage ? (
            <p className="border border-transparent font-semibold text-base-300">
              {currentVoyage}
            </p>
          ) : (
            <p className="border-transparent font-semibold text-base-300">
              {currentVoyage}
            </p>
          )}
        </li>
        <DropDownLink title="Settings" href="/hello404" />
        <Button
          title="signout"
          type="button"
          onClick={handleClick}
          variant="link"
          size={"lg"}
          className="m-0 flex w-full justify-start p-2 hover:bg-neutral-content hover:text-base-300"
        >
          Sign Out
        </Button>
      </ul>
    </div>
  );
}
