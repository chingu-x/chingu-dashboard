import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";

interface ResourceCardProps {
  title: string;
  badge: string;
  currentUser: boolean;
  date: string;
}

export default function ResourceCard({
  title,
  currentUser,
  badge,
  date,
}: ResourceCardProps) {
  const dispatch = useAppDispatch();

  function openViewModal() {
    dispatch(
      onOpenModal({
        type: "viewResource",
        content: {},
      })
    );
  }
  const openDeleteModal = () => {
    // todo: replace with modal
  };

  return (
    <div className="group [&>*]:cursor-pointer flex items-center w-11/12 p-2 bg-base-200 rounded-xl shadow-sm hover:shadow-md hover:border hover:border-base-100">
      <ArrowTopRightOnSquareIcon
        onClick={openViewModal}
        className="w-8 h-8 mr-4 stroke-1 group-hover:stroke-2 ml-2"
      />
      <div
        onClick={openViewModal}
        className="overflow-hidden flex flex-col justify-center p-2 w-full"
      >
        <h1 className="text-xl font-bold w-1/2 truncate">{title}</h1>
        <div className="flex mt-2 [&>*]:mr-8">
          <div>Shared by {badge /* Todo: replace with badge component */}</div>
          <div className="w-1 h-5 border border-r-1 border-r-neutral-content border-b-0 border-l-0 border-t-0"></div>
          <div className="text-neutral">Added {date}</div>
        </div>
      </div>
      {currentUser && (
        <div
          className="w-10 h-10 hover:bg-base-100 flex justify-center items-center rounded-full"
          onClick={openDeleteModal}
        >
          <TrashIcon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
