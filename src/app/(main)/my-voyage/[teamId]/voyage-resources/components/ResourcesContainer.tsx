"use client";
import React, { useState } from "react";
import ResourceInput from "./ResourceInput";
import SortingButton from "./SortingButton";
import ResourceCard from "./ResourceCard";
import EmptyBanner from "./EmptyBanner";
import { resources } from "./fixtures/resources";
//const resources = null // temp var for toggling empty banner or resource cards.

//TODO: Tidy up Types in ResourceComponentWrapper and ResourceContainer components.
//Should come from Redux store. See Ideation for example.
interface ResourcesContainerProps {
  data: [
    {
      id: number;
      teamMemberId: number;
      url: string;
      title: string;
      createdAt: Date;
      updatedAt: Date;
      addedBy: { member: [Object] };
    },
  ];
}

export default function ResourcesContainer({ data }: ResourcesContainerProps) {
  const [byNewest, setByNewest] = useState(true);
  const [voyageResources, setVoyageResources] = useState(data);
  console.log(voyageResources);
  const handleClick = () => {
    setByNewest(!byNewest);
    setVoyageResources(sortResources());
  };
  const sortResources = () => {
    voyageResources.sort(function (a, b) {
      if (byNewest) {
        console.log("by newest true. Sorting by oldest.");
        console.log("b: ", new Date(b.updatedAt));
        console.log("a: ", new Date(a.updatedAt));
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      } else {
        console.log("Currently showing by oldest. Sorting by newest.");
        console.log("a: ", new Date(a.updatedAt));
        console.log("b: ", new Date(b.updatedAt));
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      }
    });
    return voyageResources;
  };

  return (
    <>
      <div className="grid grid-cols-[1fr_150px] items-center">
        <ResourceInput />
        <SortingButton onClick={handleClick} type={byNewest} />
      </div>
      {!resources ? (
        <EmptyBanner />
      ) : (
        resources.map((item) => (
          <ResourceCard
            key={item.id}
            title={item.title}
            user={item.user}
            currentUser={item.currentUser}
            date={item.date}
          />
        ))
      )}
    </>
  );
}
