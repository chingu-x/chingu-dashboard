import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@chingu-x/components/button";

interface EditMenuProps {
  handleClick: () => void;
  //TODO: handleDelete will be changed to required.
  handleDelete?: () => void;
}

export default function EditMenu({ handleClick, handleDelete }: EditMenuProps) {
  return (
    <div className="absolute right-0 top-0 z-10 flex h-[116px] w-[150px] flex-col items-center justify-evenly rounded-lg border border-base-100 bg-base-200 shadow-lg">
      <Button
        variant="outline"
        size="sm"
        className="h-[34px] w-[118px] justify-start"
        onClick={handleClick}
      >
        <PencilSquareIcon className="h-4 w-4" />
        Edit
      </Button>
      <Button
        variant="error"
        size="sm"
        className="h-[34px] w-[118px] justify-start"
        onClick={handleDelete}
      >
        <TrashIcon className="h-4 w-4" />
        Delete
      </Button>
    </div>
  );
}
