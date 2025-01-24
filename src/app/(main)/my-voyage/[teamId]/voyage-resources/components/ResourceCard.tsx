import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/20/solid";
import { Badge } from "@chingu-x/components/badge";
import { Avatar } from "@chingu-x/components/avatar";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import IconButton from "@/components/IconButton";
import { deleteResource } from "@/app/(main)/my-voyage/[teamId]/voyage-resources/resourcesService";

interface ResourceCardProps {
  resourceId: number;
  title: string;
  user: { firstName: string; lastName: string; avatar: string };
  date: string;
  userId: string;
  url: string;
}

export default function ResourceCard({
  resourceId,
  title,
  user,
  date,
  userId,
  url,
}: ResourceCardProps) {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.user.id);

  const openViewModal = () => {
    const hideResourceModal = localStorage.getItem("hideResourceModal");
    if (hideResourceModal) {
      window.open(url, "_blank");
    } else {
      dispatch(
        onOpenModal({
          type: "viewResource",
          id: resourceId,
        }),
      );
    }
  };

  const openDeleteModal = () => {
    dispatch(
      onOpenModal({
        type: "confirmation",
        id: resourceId,
        content: {
          title: "Delete Resource",
          message:
            "Are you sure you want to delete? You will permanently lose all the information and will not be able to recover it.",
          confirmationText: "Delete",
          cancelText: "Keep it",
        },
        payload: {
          params: {
            resourceId,
          },
          redirect: null,
          deleteFunction: deleteResource,
        },
      }),
    );
  };

  return (
    <div className="group relative flex w-full flex-nowrap items-center gap-x-2 rounded-xl border border-base-200 bg-base-200 shadow-sm transition-all hover:border-base-100 hover:shadow-md xl:gap-x-6">
      <button
        type="button"
        aria-label="open resource details"
        onClick={openViewModal}
        className="before:absolute before:left-0 before:top-0 before:h-full before:w-full before:content-['']"
      >
        <ArrowTopRightOnSquareIcon className="mx-6 h-8 w-8 stroke-1 transition-all group-hover:stroke-2" />
      </button>
      <div className="my-2 flex w-full flex-col justify-center overflow-hidden p-2">
        <h2 className="text-xl font-semibold text-base-300">{title}</h2>
        <div className="mt-2 flex">
          <div className="flex items-center gap-x-2 border-r border-r-base-100 pr-4 xl:pr-8">
            <p>Shared by</p>
            <Badge title={user.firstName}>
              {user.avatar ? (
                <Avatar customClassName="h-4 w-4">
                  <Image
                    src={user.avatar}
                    alt={`${user.firstName}'s avatar`}
                    width={20}
                    height={20}
                  />
                </Avatar>
              ) : undefined}
            </Badge>
          </div>
          <div className="pl-4 text-neutral-focus xl:pl-8">Added {date}</div>
        </div>
      </div>
      {userId === currentUserId && (
        <IconButton
          className="z-10 mx-6"
          onClick={openDeleteModal}
          ariaLabel="delete"
        >
          <TrashIcon />
        </IconButton>
      )}
    </div>
  );
}
