import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import Badge from "@/components/badge/BadgeAlt";
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
    <div className="group flex w-full items-center rounded-xl border border-base-200 bg-base-200 p-2 shadow-sm transition-all hover:border-base-100 hover:shadow-md [&>*]:cursor-pointer">
      <ArrowTopRightOnSquareIcon
        onClick={openViewModal}
        className="ml-2 mr-4 h-8 w-8 stroke-1 transition-all group-hover:stroke-2"
      />
      <div
        onClick={openViewModal}
        className="flex w-full flex-col justify-center overflow-hidden p-2"
      >
        <h1 className="w-1/2 truncate text-xl font-bold">{title}</h1>
        <div className="mt-2 flex [&>*]:mr-8">
          <div className="flex items-center gap-x-2">
            <p>Shared by</p>
            <Badge
              title={user.firstName}
              avatarUrl={user.avatar}
              firstName={user.firstName}
              lastName={user.lastName}
            />
          </div>
          <div className="h-5 w-1 border border-y-0 border-l-0 border-r-neutral-content"></div>
          <div className="text-neutral-focus">Added {date}</div>
        </div>
      </div>
      {userId === currentUserId ? (
        <IconButton
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-base-100"
          onClick={openDeleteModal}
          ariaLabel="delete"
        >
          <TrashIcon className="h-6 w-6" />
        </IconButton>
      ) : null}
    </div>
  );
}
