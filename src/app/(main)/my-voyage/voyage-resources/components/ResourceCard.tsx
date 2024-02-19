import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/20/solid";

export default function ResourceCard () {
  
  return (
    <div className="flex items-center justify-between h-20 p-4 bg-base-200 rounded-xl shadow-sm hover:shadow-md hover:border hover:border-base-100">
      <ArrowTopRightOnSquareIcon className="w-8 h-8 stroke-1 hover:stroke-2"/>
      <div className="flex flex-col justify-center w-3/4">
        <h1 className="text-xl font-bold truncate">Title</h1>
        <div className="flex [&>*]:mr-8">
          <div>Shared by Badge goes Here</div>
          <div>Added: Timestamp</div>
        </div>
      </div>
      <div className="w-10 h-10 hover:bg-base-100 flex justify-center items-center rounded-full">
        <TrashIcon className="w-6 h-6"/>
      </div>
    </div>
  )
};
