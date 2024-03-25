"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import EmptyState from "./EmptyState";
import AgendaTopic from "./AgendaTopic";
import AgendaHeader from "./AgendaHeader";
// import { topicsData } from "@/app/(main)/my-voyage/[teamId]/sprints/components/fixtures/Meeting";

import routePaths from "@/utils/routePaths";

import Divider from "@/app/(main)/my-voyage/[teamId]/sprints/components/Divider";
import { Agenda } from "@/store/features/sprint/sprintSlice";

interface AgendasProps {
  teamId: string;
  topics: Agenda[];
}

export default function Agendas({ teamId, topics }: AgendasProps) {
  const router = useRouter();

  const [incompletedTopics, setIncompletedTopics] = useState(
    topics.filter((topic) => topic.status === false),
  );
  const [completedTopics, setCompletedTopics] = useState(
    topics.filter((topic) => topic.status === true),
  );

  const changeStatus = (id: number, status: boolean) => {
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
    router.push(routePaths.addTopic(teamId));
  };

  const dividerIsVisible = completedTopics.length !== 0;

  return (
    <div className="flex flex-col items-center justify-between w-full p-10 border bg-base-200 rounded-2xl border-base-100">
      <AgendaHeader teamId={teamId} />
      {/* INCOMPLETED TOPICS */}
      {topics.length === 0 && <EmptyState />}
      <ul className="flex flex-col w-full gap-y-5">
        {incompletedTopics.map((topic) => (
          <AgendaTopic
            key={topic.id}
            topic={topic}
            editTopic={editTopic}
            changeStatus={changeStatus}
          />
        ))}
      </ul>
      {/* DIVIDER */}
      <AnimatePresence>
        {dividerIsVisible && (
          <motion.div layout className="w-full">
            <Divider title="Completed Topics" className="py-5 bg-base-200" />
          </motion.div>
        )}
      </AnimatePresence>
      {/* COMPLETED TOPICS */}
      <ul className="flex flex-col w-full gap-y-5">
        {completedTopics.map((topic) => (
          <AgendaTopic
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
