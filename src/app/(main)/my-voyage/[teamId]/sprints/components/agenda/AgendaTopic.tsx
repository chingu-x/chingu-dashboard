import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";

import IconButton from "@/components/IconButton";
import { type Agenda } from "@/app/(main)/my-voyage/[teamId]/sprints/components/fixtures/Meeting";
import { cn } from "@/lib/utils";

interface TopicProps {
  topic: Agenda;
  editTopic: () => void;
  changeStatus: (id: number, status: boolean) => void;
  statusButtonDisabled: boolean;
}

export default function AgendaTopic({
  topic,
  editTopic,
  changeStatus,
  statusButtonDisabled,
}: TopicProps) {
  return (
    <motion.li
      key={topic.id}
      layout
      className={cn(
        "flex w-full flex-col gap-y-4 rounded-lg bg-base-100 p-5",
        topic.status && "bg-neutral-content",
      )}
    >
      <div className="flex justify-between">
        <h4 className="py-2 text-xl font-medium">{topic.title}</h4>
        <div className="flex items-center gap-x-5">
          <IconButton onClick={editTopic} aria-label="edit topic">
            <EllipsisVerticalIcon />
          </IconButton>
          <IconButton
            onClick={() => changeStatus(topic.id, !topic.status)}
            aria-label="change status"
            disabled={statusButtonDisabled}
          >
            {topic.status ? (
              <CheckCircleIconSolid className="h-5 w-5 stroke-[1.5px] text-base-300" />
            ) : (
              <CheckCircleIcon className="h-5 w-5 stroke-[1.5px] text-base-300" />
            )}
          </IconButton>
        </div>
      </div>
      <p className="whitespace-pre-wrap rounded-lg border-2 border-neutral/40 bg-base-200 px-[14px] py-[10px] text-base font-medium text-neutral-focus">
        {topic.description}
      </p>
    </motion.li>
  );
}
