"use client";
import React, { useEffect, useState } from "react";
import ResourceInput from "./ResourceInput";
import SortingButton from "./SortingButton";
import ResourceCard from "./ResourceCard";
import EmptyBanner from "./EmptyBanner";
import { ResourceData } from "@/store/features/resources/resourcesSlice";
import { useResource } from "@/store/hooks";

export default function ResourcesContainer() {
  const [byNewest, setByNewest] = useState(true);
  const initialResourcesState = useResource().resources;
  const [voyageResources, setVoyageResources] = useState(initialResourcesState);

  const mapResources = (resources: ResourceData[] | null) =>
    resources?.map((item) => {
      const formattedDate = new Date(item.updatedAt).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        },
      );
      return {
        ...item,
        date: formattedDate,
      };
    });

  const sortResources = (resources: ResourceData[] | null) =>
    resources?.slice().sort(function (a, b) {
      const prev = new Date(a.updatedAt);
      const next = new Date(b.updatedAt);
      if (byNewest) {
        return prev.getTime() - next.getTime();
      } else {
        return next.getTime() - prev.getTime();
      }
    });

  const handleClick = () => {
    const sortedResources = sortResources(voyageResources);
    if (sortedResources !== undefined) {
      setVoyageResources(sortedResources);
    }
    setByNewest(!byNewest);
  };

  useEffect(() => {
    setVoyageResources(initialResourcesState);
  }, [initialResourcesState]);

  const resourceList = mapResources(voyageResources);

  return (
    <>
      <div className="grid grid-cols-[1fr_150px] items-center">
        <ResourceInput />
        <SortingButton
          onClick={handleClick}
          type={byNewest}
          isDisabled={!resourceList ? true : false}
        />
      </div>
      {!resourceList ? (
        <EmptyBanner />
      ) : (
        resourceList.map((item) => (
          <ResourceCard
            key={item.id}
            id={item.id}
            title={item.title}
            user={item.addedBy.member}
            date={item.date}
            userId={item.teamMemberId}
            url={item.url}
          />
        ))
      )}
    </>
  );
}
