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
import { type Section } from "@/store/features/sprint/sprintSlice";
import { Forms } from "@/utils/form/formsEnums";

interface SectionsProps {
  params: {
    meetingId: string;
    sprintNumber: string;
  };
  notes?: string;
  planning?: Section;
  review?: Section;
}

export default function Sections({
  params,
  notes,
  planning,
  review,
}: SectionsProps) {
  const sectionTemplates = [
    {
      id: Forms.notes,
      title: "notes",
      icon: <DocumentTextIcon aria-hidden="true" />,
      isAdded: notes !== null,
      children: <Notes />,
    },
    {
      id: Forms.planning,
      title: "sprint planning",
      icon: <LightBulbIcon aria-hidden="true" />,
      isAdded: planning !== undefined,
      children: <Planning />,
    },
    {
      id: Forms.review,
      title: "retrospective & review",
      icon: <ArrowPathRoundedSquareIcon aria-hidden="true" />,
      isAdded: review !== undefined,
      children: <Review />,
    },
  ];

  const [addedSections, setAddedSections] = useState(
    sectionTemplates.filter((template) => template.isAdded === true),
  );
  const [canBeAddedSections, setCanBeAddedSections] = useState(
    sectionTemplates.filter((template) => template.isAdded === false),
  );

  function reorderSections(title: string) {
    const sectionIndex = canBeAddedSections.findIndex(
      (section) => section.title === title,
    );
    const section = {
      ...canBeAddedSections[sectionIndex],
      isAdded: true,
    };
    setCanBeAddedSections([...canBeAddedSections].toSpliced(sectionIndex, 1));
    setAddedSections([...addedSections, section]);
  }

  const dividerIsVisible = canBeAddedSections.length !== 0;

  return (
    <div className="flex flex-col gap-y-10 overflow-hidden">
      {/* ADDED SECTIONS */}
      {addedSections.map((section) => (
        <SectionBase
          key={`${section.title}-section-added`}
          id={section.id}
          title={section.title}
          icon={section.icon}
          isAdded={section.isAdded}
          params={params}
        >
          {section.children}
        </SectionBase>
      ))}
      {/* DIVIDER */}
      {dividerIsVisible && (
        <Divider title="Add a Section Template to the Meeting ↓" />
      )}
      {/* CAN BE ADDED SECTIONS */}
      {canBeAddedSections.map((section) => (
        <SectionBase
          key={`${section.title}-section-not-added`}
          id={section.id}
          title={section.title}
          icon={section.icon}
          isAdded={section.isAdded}
          reorderSections={reorderSections}
          params={params}
        >
          {section.children}
        </SectionBase>
      ))}
    </div>
  );
}
