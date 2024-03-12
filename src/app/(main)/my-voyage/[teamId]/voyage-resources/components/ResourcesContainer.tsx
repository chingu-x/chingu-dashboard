"use client";
import React, { useState } from "react";
import ResourceInput from "./ResourceInput";
import SortingButton from "./SortingButton";
import ResourceCard from "./ResourceCard";
import EmptyBanner from "./EmptyBanner";
import { resources } from "./fixtures/resources";
import { ResourceData } from "@/store/features/resources/resourcesSlice";
//const resources = null // temp var for toggling empty banner or resource cards.

interface ResourcesContainerProps {
  data: ResourceData[];
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
      const prev = new Date(a.updatedAt);
      const next = new Date(b.updatedAt);
      if (byNewest) {
        return next.getTime() - prev.getTime();
      } else {
        return prev.getTime() - next.getTime();
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
