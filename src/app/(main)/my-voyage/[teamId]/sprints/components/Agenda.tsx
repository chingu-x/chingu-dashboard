"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  EllipsisVerticalIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

import { topicsData } from "./fixtures/Meeting";
import routePaths from "@/utils/routePaths";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";

export default function Agenda() {
  const router = useRouter();
  // Temp
  const [topics, setTopics] = useState(topicsData);

  const changeStatus = (id: number) => {
    const newTopics = topics.map((topic) =>
      topic.id === id ? { ...topic, status: !topic.status } : topic,
    );
    setTopics(newTopics);
  };
  const editTopic = () => {
    router.push(routePaths.addTopic("2"));
  };
  return (
    <div className="flex flex-col items-center justify-between w-full p-10 bg-base-200 rounded-2xl gap-y-5">
      <div className="flex justify-between w-full">
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
      {topics.length === 0 && (
        <div className="flex flex-col w-full p-5 rounded-lg bg-base-100 gap-y-4">
          <h4 className="py-2 text-xl font-medium">
            Contribute to the agenda!
          </h4>
          <p className="py-[10px] px-[14px] text-base font-medium text-neutral-focus bg-base-200 rounded-lg border-2 border-neutral/40 ">
            To get started, click the Add Topic button to propose a new topic
            for discussion during the upcoming meeting. Your input will assist
            the team in planning for the meeting and ensuring that essential
            topics receive proper attention.
          </p>
        </div>
      )}
      {topics.map((topic) => (
        <div
          key={topic.id}
          className={cn(
            "flex flex-col w-full p-5 rounded-lg bg-base-100 gap-y-4",
            !topic.status && "bg-neutral-content",
          )}
        >
          <div className="flex justify-between">
            <h4 className="py-2 text-xl font-medium">{topic.title}</h4>
            <div className="flex gap-x-5">
              {/* TODO: replace with icon button ??? */}
              <button type="button" className="px-1" onClick={editTopic}>
                <EllipsisVerticalIcon className="w-5 h-5 text-base-300 stroke-[1.5px]" />
              </button>
              <button
                type="button"
                className="px-1"
                onClick={() => changeStatus(topic.id)}
              >
                {topic.status ? (
                  <CheckCircleIcon className="w-5 h-5 text-base-300 stroke-[1.5px]" />
                ) : (
                  <CheckCircleIconSolid className="w-5 h-5 text-base-300 stroke-[1.5px]" />
                )}
              </button>
            </div>
          </div>
          <p className="py-[10px] px-[14px] text-base font-medium text-neutral-focus bg-base-200 rounded-lg border-2 border-neutral/40 ">
            {topic.description}
          </p>
        </div>
      ))}
    </div>
  );
}
