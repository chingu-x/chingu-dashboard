import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";

export default function EditPopover({ setEditMode, setShowPopover }) {
  function handleClick() {
    setEditMode(true);
    setShowPopover(false);
  }

  return (
    <div className="flex flex-col justify-evenly items-center w-[150px] h-[116px] bg-base-200 border border-base-100 rounded-lg shadow-lg absolute top-0 right-0 z-10">
      <Button
        variant="outline"
        size="sm"
        className="w-[118px] h-[34px] justify-start"
        onClick={handleClick}
      >
        <PencilSquareIcon className="w-4 h-4" />
        Edit
      </Button>
      <Button
        variant="error"
        size="sm"
        className="w-[118px] h-[34px] justify-start"
      >
        <TrashIcon className="w-4 h-4" />
        Delete
      </Button>
    </div>
  );
}
