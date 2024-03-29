"use client";
import React, { useState } from "react";
import ResourceInput from "./ResourceInput";
import SortingButton from "./SortingButton";
import ResourceCard from "./ResourceCard";
import EmptyBanner from "./EmptyBanner";
import { resources } from "./fixtures/resources";
import { ResourceData } from "@/store/features/resources/resourcesSlice";
//const resources = null // temp var for toggling empty banner or resource cards based on 'fake data'

interface ResourcesContainerProps {
  data: ResourceData[];
}

export default function ResourcesContainer({ data }: ResourcesContainerProps) {
  const [byNewest, setByNewest] = useState(true);
  {
    /*TODO: replace 'data' with call to Redux store resources slice.*/
  }
  const [voyageResources, setVoyageResources] = useState(data);

  const handleClick = () => {
    setVoyageResources(sortResources());
    setByNewest(!byNewest);
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
        {/*TODO: replace 'resources' (fake data) with 'voyageResources'*/}
        {!resources ? (
          <SortingButton
            onClick={handleClick}
            type={byNewest}
            isDisabled={true}
          />
        ) : (
          <SortingButton
            onClick={handleClick}
            type={byNewest}
            isDisabled={false}
          />
        )}
      </div>
      {/*TODO: replace 'resources' (fake data) with 'voyageResources'*/}
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
