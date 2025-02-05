"use client";

import Link from "next/link";
import { Button } from "@chingu-x/components/button";
import { DropDown } from "@chingu-x/components/navbar";
import { useAppDispatch, useUser } from "@/store/hooks";
import { clientSignOut } from "@/store/features/auth/authSlice";
import { serverSignOut } from "@/app/(auth)/authService";
import { onOpenModal } from "@/store/features/modal/modalSlice";

export default function UserDropDown({ openState }: { openState?: boolean }) {
  const dispatch = useAppDispatch();
  const allVoyages = useUser().voyageTeamMembers;
  const activeVoyage = allVoyages?.find(
    (item) => item.voyageTeam.voyage.status.name === "Active",
  );

  const currentVoyage = activeVoyage?.voyageTeam.name
    ? `Team - Tier ${activeVoyage.voyageTeam.name
      .split("-")[1]
      .split("tier")[1]
      .toUpperCase()} ${activeVoyage.voyageTeam.name
      .split("-")[0]
      .toUpperCase()}`
    : "Please join a voyage to see your status information.";

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

  return (
    <DropDown openState={openState}>
      <div className="rounded-lg bg-secondary-content p-2 text-xs [&>*]:m-1">
        <p className="text-[10px] font-medium text-neutral-focus">My Voyage:</p>
        {activeVoyage?.voyageTeam.name ? (
          <p className="border border-transparent text-base font-medium text-base-300">
            {currentVoyage}
          </p>
        ) : (
          <p className="border-transparent font-semibold text-base-300">
            {currentVoyage}
          </p>
        )}
      </div>
      <Link href="/hello404">
        <Button
          type="button"
          variant="link"
          size="lg"
          className="m-0 flex w-full justify-start p-2 hover:bg-base-100 hover:text-base-300"
        >
          Settings
        </Button>
      </Link>
      <Button
        type="button"
        onClick={handleClick}
        variant="link"
        size="lg"
        className="m-0 flex w-full justify-start p-2 hover:bg-base-100 hover:text-base-300"
      >
        Sign Out
      </Button>
    </DropDown>
  );
}
