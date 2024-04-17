"use client";

import { useState } from "react";
import {
  ArrowPathRoundedSquareIcon,
  // DocumentTextIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

// import Notes from "./Notes";
import Planning from "./Planning";
import Review from "./Review";
import SectionBase from "./SectionBase";
import Divider from "@/app/(main)/my-voyage/[teamId]/sprints/components/Divider";
import { Section } from "@/store/features/sprint/sprintSlice";

interface SectionsProps {
  params: {
    meetingId: string;
    sprintNumber: string;
  };
  sections: Section[];
}

export default function Sections({ params, sections }: SectionsProps) {
  const planningData = sections.find((section) => section.form.id === 2);
  const retrospectiveData = sections.find((section) => section.form.id === 1);

  const sectionTemplates = [
    // {
    //   title: "notes",
    //   icon: <DocumentTextIcon aria-hidden="true" />,
    //   isAdded: false,
    //   children: <Notes />,
    // },
    {
      id: 2,
      title: "sprint planning",
      icon: <LightBulbIcon aria-hidden="true" />,
      isAdded: planningData !== undefined,
      children: <Planning data={planningData} />,
    },
    {
      id: 1,
      title: "retrospective & review",
      icon: <ArrowPathRoundedSquareIcon aria-hidden="true" />,
      isAdded: retrospectiveData !== undefined,
      children: <Review data={retrospectiveData} />,
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
    <div className="flex flex-col overflow-hidden gap-y-10">
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
