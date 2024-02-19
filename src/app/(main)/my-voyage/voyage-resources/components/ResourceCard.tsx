import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/20/solid";

export default function ResourceCard () {
  return (
    <div className="flex items-center justify-between bg-base-200 border border-base-100 rounded-xl shadow-sm hover:shadow-md h-20 p-4">
      <ArrowTopRightOnSquareIcon className="w-8 h-8 stroke-1 hover:stroke-2"/>
      <div className="border border-red-500 flex flex-col justify-center h-full w-3/4">
        <h1 className="text-xl font-bold">title</h1>
        <div className="flex">
          <p>Shared by: </p>
          <div>Badge Here...</div>
        </div>
      </div>
      <div className="w-10 h-10 hover:bg-base-100 flex justify-center items-center rounded-full">
        <TrashIcon className="w-6 h-6"/>
      </div>
    </div>
  )
};
