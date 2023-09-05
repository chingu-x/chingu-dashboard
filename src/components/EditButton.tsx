import { PencilSquareIcon } from "@heroicons/react/24/solid";

interface EditButtonProps {
  title: string;
}

export default function EditButton({ title }: EditButtonProps) {
  return (
    <button
      type="button"
      className="btn grid grid-cols-[auto,auto] gap-x-1 mt-5 mr-5 capitalize w-16 h-8 p-0 min-h-full text-sm font-semibold text-black bg-secondary border-transparent"
      aria-label={`Edit ${title}`}
    >
      <PencilSquareIcon className="h-4 w-4 text-black" />
      Edit
    </button>
  );
}
