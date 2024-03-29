import Link from "next/link";
import {
  ClipboardDocumentListIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import routePaths from "@/utils/routePaths";
import Button from "@/components/Button";

export default function AgendaHeader() {
  return (
    <div className="flex justify-between w-full mb-5">
      <h3 className="text-[25px] font-semibold flex gap-x-2 items-center">
        <ClipboardDocumentListIcon className="h-[30px] w-[30px]" />
        Agenda
      </h3>
      <Link href={routePaths.addTopic("2")}>
        <Button className="gap-x-[60px] w-[230px] justify-between" size="lg">
          Add topic <PlusIcon className="w-[20px] h-[20px]" />
        </Button>
      </Link>
    </div>
  );
}
