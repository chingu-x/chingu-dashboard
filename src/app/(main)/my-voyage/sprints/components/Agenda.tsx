import {
  ClipboardDocumentListIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Button";

export default function Agenda() {
  return (
    <div className="flex flex-col items-center justify-between w-full p-10 bg-base-200 rounded-2xl gap-y-5">
      <div className="flex justify-between w-full">
        <h3 className="text-[25px] font-semibold flex gap-x-2 items-center">
          <ClipboardDocumentListIcon className="h-[30px] w-[30px]" />
          Agenda
        </h3>
        <Button className="gap-x-[60px] w-[230px] justify-between" size="lg">
          Add topic <PlusIcon className="w-[20px] h-[20px]" />
        </Button>
      </div>
      <div className="flex flex-col p-5 rounded-lg bg-base-100 gap-y-4">
        <h4 className="py-2 text-xl font-medium">Contribute to the agenda!</h4>
        <p className="py-[10px] px-[14px] text-base font-medium text-neutral-focus bg-base-200 rounded-lg border-2 border-neutral/40 ">
          To get started, click the Add Topic button to propose a new topic for
          discussion during the upcoming meeting. Your input will assist the
          team in planning for the meeting and ensuring that essential topics
          receive proper attention.
        </p>
      </div>
    </div>
  );
}
