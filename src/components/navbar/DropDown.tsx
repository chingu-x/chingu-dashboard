"use client";

import "reflect-metadata";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LogoutResponseDto } from "@chingu-x/modules/auth";
import Button from "@/components/Button";
import { useAppDispatch, useUser } from "@/store/hooks";
import { clientSignOut } from "@/store/features/auth/authSlice";
import routePaths from "@/utils/routePaths";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { CacheTag } from "@/utils/cacheTag";
import { authAdapter } from "@/utils/adapters";

interface DropdownProps {
  openState?: boolean;
}

export default function DropDown({ openState }: DropdownProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const allVoyages = useUser().voyageTeamMembers;
  const activeVoyage = allVoyages?.find(
    (item) => item.voyageTeam.voyage.status.name === "Active",
  );

  let currentVoyage;

  if (activeVoyage?.voyageTeam.name) {
    currentVoyage = `Team - Tier ${activeVoyage.voyageTeam.name
      .split("-")[1]
      .split("tier")[1]
      .toUpperCase()} ${activeVoyage.voyageTeam.name
      .split("-")[0]
      .toUpperCase()}`;
  } else {
    currentVoyage = "Please join a voyage to see your status information.";
  }
  const closed = "hidden";
  const open =
    "absolute flex flex-col gap-5 z-[1] w-[250px] p-5 bottom-100 translate-y-[15%] shadow-md bg-base-200 right-0 border border-base-100 rounded-2xl";

  function handleClick() {
    mutate();
  }

  async function logoutMutation(): Promise<LogoutResponseDto> {
    return await authAdapter.logout();
  }

  const { mutate } = useMutation<LogoutResponseDto, Error, void>({
    mutationKey: [CacheTag.logout],
    mutationFn: logoutMutation,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [CacheTag.me] });
      dispatch(clientSignOut());
      router.replace(routePaths.signIn());
    },
    // TODO: update error handling
    onError: (error: Error) => {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
    },
  });

  const handleDropDownClick = (event: React.MouseEvent<HTMLDivElement>) => {
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
      <div
        tabIndex={0}
        className={openState ? open : closed}
        onClick={handleDropDownClick}
      >
        <div className="rounded-lg bg-secondary-content p-2 text-xs [&>*]:m-1">
          <p className="text-[10px] font-medium text-neutral-focus">
            My Voyage:
          </p>
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
      </div>
    </div>
  );
}
