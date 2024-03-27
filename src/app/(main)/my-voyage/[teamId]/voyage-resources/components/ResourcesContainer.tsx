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
    resources?.map((item) => ({
      key: item.id,
      title: item.title,
      url: item.url,
      user: {
        name: item.addedBy.member.firstName,
        image: item.addedBy.member.avatar,
      },
      date: new Date(item.updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      userId: item.teamMemberId,
    }));

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
        {!resourceList ? (
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
      {!resourceList ? (
        <EmptyBanner />
      ) : (
        resourceList.map((item) => (
          <ResourceCard
            key={item.key}
            title={item.title}
            user={item.user}
            date={item.date}
            userId={item.userId}
            url={item.url}
          />
        ))
      )}
    </>
  );
}
