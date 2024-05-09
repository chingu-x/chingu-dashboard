"use client";
import Button from "@/components/Button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function SettingsMenu() {
  return (
    <>
      <div className="absolute z-10 ml-20 mt-28 bg-base-200 border-2 border-base-100 rounded-xl  w-40 h-36 flex flex-col justify-evenly p-2">
        <Button variant="outline" size="xs" className="flex justify-start">
          <PencilSquareIcon className="w-3/12 h-3/12 " />
          Edit
        </Button>
        <Button variant="error" size="xs" className="flex justify-start">
          <TrashIcon className="w-3/12 h-3/12" />
          Delete
        </Button>
      </div>
    </>
  );
}
