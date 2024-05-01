import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import Badge from "@/components/badge/Badge";
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
    <div className="group [&>*]:cursor-pointer flex items-center w-full p-2 bg-base-200 border border-base-200 rounded-xl shadow-sm transition-all hover:shadow-md hover:border-base-100">
      <ArrowTopRightOnSquareIcon
        onClick={openViewModal}
        className="w-8 h-8 ml-2 mr-4 transition-all stroke-1 group-hover:stroke-2"
      />
      <div
        onClick={openViewModal}
        className="flex flex-col justify-center w-full p-2 overflow-hidden"
      >
        <h1 className="w-1/2 text-xl font-bold truncate">{title}</h1>
        <div className="flex mt-2 [&>*]:mr-8">
          <div className="flex items-center gap-x-2">
            <p>Shared by</p>
            <Badge title={user.firstName} avatarUrlImage={user.avatar} />
          </div>
          <div className="w-1 h-5 border border-t-0 border-b-0 border-l-0 border-r-1 border-r-neutral-content"></div>
          <div className="text-neutral">Added {date}</div>
        </div>
      </div>
      {userId === currentUserId ? (
        <IconButton
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-base-100"
          onClick={openDeleteModal}
        >
          <TrashIcon className="w-6 h-6" />
        </IconButton>
      ) : null}
    </div>
  );
}
