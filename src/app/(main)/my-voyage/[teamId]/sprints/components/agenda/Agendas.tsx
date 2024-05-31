"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import NoAgendasState from "./NoAgendasState";
import AgendaTopic from "./AgendaTopic";
import AgendaHeader from "./AgendaHeader";

import routePaths from "@/utils/routePaths";
import Divider from "@/myVoyage/sprints/components/Divider";
import { type Agenda } from "@/store/features/sprint/sprintSlice";
import useServerAction from "@/hooks/useServerAction";
import { changeAgendaTopicStatus } from "@/myVoyage/sprints/sprintsService";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";

interface AgendasProps {
  params: {
    teamId: string;
    meetingId: string;
    sprintNumber: string;
  };
  topics: Agenda[];
}

export default function Agendas({ params, topics }: AgendasProps) {
  topics = topics.sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
  const [teamId, meetingId, sprintNumber] = [
    Number(params.teamId),
    Number(params.meetingId),
    Number(params.sprintNumber),
  ];
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [incompletedTopics, setIncompletedTopics] = useState(
    topics.filter((topic) => topic.status === false),
  );
  const [completedTopics, setCompletedTopics] = useState(
    topics.filter((topic) => topic.status === true),
  );

  const {
    runAction: changeAgendaTopicAction,
    isLoading: changeAgendaTopicLoading,
    setIsLoading: setChangeAgendaTopicLoading,
  } = useServerAction(changeAgendaTopicStatus);

  const changeStatus = async (agendaId: number, status: boolean) => {
    const [res, error] = await changeAgendaTopicAction({
      status,
      agendaId,
      sprintNumber,
    });
    if (res) {
      if (status === true) {
        const topicIndex = incompletedTopics.findIndex(
          (topic) => topic.id === agendaId,
        );
        const topic = { ...incompletedTopics[topicIndex], status: true };
        setIncompletedTopics([...incompletedTopics].toSpliced(topicIndex, 1));
        setCompletedTopics([...completedTopics, topic]);
      } else {
        const topicIndex = completedTopics.findIndex(
          (topic) => topic.id === agendaId,
        );
        const topic = { ...completedTopics[topicIndex], status: false };
        setCompletedTopics([...completedTopics].toSpliced(topicIndex, 1));
        setIncompletedTopics([...incompletedTopics, topic]);
      }
      setChangeAgendaTopicLoading(false);
    }
    if (error) {
      dispatch(
        onOpenModal({ type: "error", content: { message: error.message } }),
      );
      setChangeAgendaTopicLoading(false);
    }
  };

  const editTopic = (agendaTopicId: number) => {
    router.push(
      routePaths.editTopicPage(
        teamId.toString(),
        sprintNumber.toString(),
        meetingId.toString(),
        agendaTopicId.toString(),
      ),
    );
  };

  const dividerIsVisible = completedTopics.length !== 0;

  return (
    <div className="flex w-full flex-col items-center justify-between rounded-2xl border border-base-100 bg-base-200 p-10">
      <AgendaHeader
        teamId={teamId}
        sprintNumber={sprintNumber}
        meetingId={meetingId}
      />
      {/* INCOMPLETED TOPICS */}
      {topics.length === 0 && <NoAgendasState />}
      <ul className="flex w-full flex-col gap-y-5">
        {incompletedTopics.map((topic) => (
          <AgendaTopic
            key={topic.id}
            topic={topic}
            editTopic={() => editTopic(topic.id)}
            changeStatus={changeStatus}
            statusButtonDisabled={changeAgendaTopicLoading}
          />
        ))}
      </ul>
      {/* DIVIDER */}
      <AnimatePresence>
        {dividerIsVisible && (
          <motion.div layout className="w-full">
            <Divider title="Completed Topics" className="bg-base-200 py-5" />
          </motion.div>
        )}
      </AnimatePresence>
      {/* COMPLETED TOPICS */}
      <ul className="flex w-full flex-col gap-y-5">
        {completedTopics.map((topic) => (
          <AgendaTopic
            key={topic.id}
            topic={topic}
            editTopic={() => editTopic(topic.id)}
            changeStatus={changeStatus}
            statusButtonDisabled={changeAgendaTopicLoading}
          />
        ))}
      </ul>
    </div>
  );
}
