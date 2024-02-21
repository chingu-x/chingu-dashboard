import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/20/solid";

interface ResourceCardProps {
  title: string;
  badge: string;
  currentUser: boolean;
  date: string;
  deleteResource: () => void;
  viewResource: () => void;
}

export default function ResourceCard ({ title, currentUser, badge, date, deleteResource, viewResource }:ResourceCardProps) {
  return (
    <div  className="[&>*]:cursor-pointer flex items-center justify-start h-20 p-4 bg-base-200 rounded-xl shadow-sm hover:shadow-md hover:border hover:border-base-100">
      <ArrowTopRightOnSquareIcon onClick={viewResource} className="w-8 h-8 stroke-1 hover:stroke-2" />
      <div onClick={viewResource} className="flex flex-col justify-center p-2 w-full">
        <h1 className="text-xl font-bold truncate">{title}</h1>
        <div className="flex [&>*]:mr-8">
          <div>Shared by {badge}</div>
          <div>Added: {date}</div>
        </div>
      </div>
      {currentUser && (
        <div className="w-10 h-10 hover:bg-base-100 flex justify-center items-center rounded-full" onClick={deleteResource}>
          <TrashIcon className="w-6 h-6"/>
        </div>
      )}
    </div>
  );
};
