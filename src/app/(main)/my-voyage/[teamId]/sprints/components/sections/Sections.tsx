"use client";

import { useState } from "react";
import {
  ArrowPathRoundedSquareIcon,
  DocumentTextIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

import Notes from "./Notes";
import Planning from "./Planning";
import Review from "./Review";
import SectionBase from "./SectionBase";
import Divider from "@/app/(main)/my-voyage/[teamId]/sprints/components/Divider";

export default function Sections() {
  const [notesIsAdded, setNotesIsAdded] = useState(false);
  const [planningIsAdded, setPlanningIsAdded] = useState(false);
  const [reviewIsAdded, setReviewIsAdded] = useState(false);

  const dividerIsVisible = !notesIsAdded || !planningIsAdded || !reviewIsAdded;
  return (
    <div className="flex flex-col overflow-hidden gap-y-10">
      {/* DIVIDER */}
      {dividerIsVisible && (
        <Divider title="Add a Section Template to the Meeting ↓" />
      )}
      {/* NOTES */}
      <SectionBase
        title="Notes"
        icon={
          <DocumentTextIcon
            aria-hidden="true"
            className="h-[30px] w-[30px] text-base-300"
          />
        }
        isAdded={notesIsAdded}
        setIsAdded={setNotesIsAdded}
      >
        <Review />
      </SectionBase>
      {/* SPRINT PLANNING */}
      <SectionBase
        title="Sprint Planning"
        icon={
          <LightBulbIcon
            aria-hidden="true"
            className="h-[30px] w-[30px] text-base-300"
          />
        }
        isAdded={planningIsAdded}
        setIsAdded={setPlanningIsAdded}
      >
        <Planning />
      </SectionBase>
      {/* RETROSPECTIVE & REVIEW */}
      <SectionBase
        title="Retrospective & Review"
        icon={
          <ArrowPathRoundedSquareIcon
            aria-hidden="true"
            className="h-[30px] w-[30px] text-base-300"
          />
        }
        isAdded={reviewIsAdded}
        setIsAdded={setReviewIsAdded}
      >
        <Notes />
      </SectionBase>
    </div>
  );
}
