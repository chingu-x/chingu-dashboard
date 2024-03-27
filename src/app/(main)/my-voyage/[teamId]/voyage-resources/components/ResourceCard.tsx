import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import Badge from "@/components/badge/Badge";

interface ResourceCardProps {
  title: string;
  user: { name: string; image: string };
  date: string;
  userId: number;
  url: string;
}

export default function ResourceCard({
  title,
  user,
  date,
  userId,
  url,
}: ResourceCardProps) {
  const dispatch = useAppDispatch();
  const currentUserId = 7; //TODO: replace with id from logged in user.

  const openViewModal = () => {
    const hideResourceModal = localStorage.getItem("hideResourceModal");
    if (hideResourceModal) {
      window.open(url, "_blank");
    } else {
      dispatch(
        onOpenModal({
          type: "viewResource",
          content: { title: title, link: url },
        }),
      );
    }
  };
  const openDeleteModal = () => {
    // todo: replace with modal
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
            <Badge title={user.name} avatarUrlImage={user.image} />
          </div>
          <div className="w-1 h-5 border border-t-0 border-b-0 border-l-0 border-r-1 border-r-neutral-content"></div>
          <div className="text-neutral">Added {date}</div>
        </div>
      </div>
      {/**TODO: currentUserId used in comparison check is a placeholder. <id> from currently logged in user of different type to <teamMemberId> on a resource.
       *        change currentId to appropriate variable(s) for comparison.
       */}
      {userId === currentUserId ? (
        // TODO: replace with icon button
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-base-100"
          onClick={openDeleteModal}
        >
          <TrashIcon className="w-6 h-6" />
        </div>
      ) : null}
    </div>
  );
}
