"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ClipboardDocumentListIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

import EmptyState from "./EmptyState";
import Topic from "./AgendaTopic";
import { topicsData } from "@/app/(main)/my-voyage/[teamId]/sprints/components/fixtures/Meeting";
import routePaths from "@/utils/routePaths";
import Button from "@/components/Button";
import Divider from "@/app/(main)/my-voyage/[teamId]/sprints/components/Divider";

export default function Agenda() {
  const router = useRouter();
  // Temp
  const [incompletedTopics, setIncompletedTopics] = useState(
    topicsData.filter((topic) => topic.status === false),
  );
  const [completedTopics, setCompletedTopics] = useState(
    topicsData.filter((topic) => topic.status === true),
  );

  const changeStatus = (id: number, status: boolean) => {
    // Temp
    if (status === false) {
      const topicIndex = incompletedTopics.findIndex(
        (topic) => topic.id === id,
      );
      const topic = { ...incompletedTopics[topicIndex], status: true };
      setIncompletedTopics([...incompletedTopics].toSpliced(topicIndex, 1));
      setCompletedTopics([...completedTopics, topic]);
    } else {
      const topicIndex = completedTopics.findIndex((topic) => topic.id === id);
      const topic = { ...completedTopics[topicIndex], status: false };
      setCompletedTopics([...completedTopics].toSpliced(topicIndex, 1));
      setIncompletedTopics([...incompletedTopics, topic]);
    }
  };

  const editTopic = () => {
    router.push(routePaths.addTopic("2"));
  };
  return (
    <div className="flex flex-col items-center justify-between w-full p-10 border bg-base-200 rounded-2xl border-base-100">
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
      {topicsData.length === 0 && <EmptyState />}
      <ul className="flex flex-col w-full gap-y-5">
        {incompletedTopics.map((topic) => (
          <Topic
            key={topic.id}
            topic={topic}
            editTopic={editTopic}
            changeStatus={changeStatus}
          />
        ))}
      </ul>
      {completedTopics.length !== 0 && (
        <motion.div layout className="w-full">
          <Divider title="Completed Topics" className="py-5 bg-base-200" />
        </motion.div>
      )}
      <ul className="flex flex-col w-full gap-y-5">
        {completedTopics.map((topic) => (
          <Topic
            key={topic.id}
            topic={topic}
            editTopic={editTopic}
            changeStatus={changeStatus}
          />
        ))}
      </ul>
    </div>
  );
}
