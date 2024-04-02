"use client";
import React, { useEffect, useState } from "react";
import ResourceInput from "./ResourceInput";
import SortingButton from "./SortingButton";
import ResourceCard from "./ResourceCard";
import EmptyBanner from "./EmptyBanner";
import { useResource } from "@/store/hooks";

export default function ResourcesContainer() {
  const [byNewest, setByNewest] = useState(true);
  const initialResourcesState = useResource().resources;
  const [voyageResources, setVoyageResources] = useState(initialResourcesState);

  const formattedResources = voyageResources?.map((item) => ({
    ...item,
    date: new Date(item.updatedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  }));

  const sortResources = () => {
    const sortedResources = [...voyageResources].sort((a, b) => {
      const prev = new Date(a.updatedAt);
      const next = new Date(b.updatedAt);
      return byNewest
        ? prev.getTime() - next.getTime()
        : next.getTime() - prev.getTime();
    });
    setVoyageResources(sortedResources);
    setByNewest(!byNewest);
  };

  useEffect(() => {
    setVoyageResources(initialResourcesState);
  }, [initialResourcesState]);

  return (
    <>
      <div className="grid grid-cols-[1fr_150px] items-center">
        <ResourceInput />
        <SortingButton
          onClick={sortResources}
          type={byNewest}
          isDisabled={!voyageResources?.length}
        />
      </div>
      {formattedResources?.length ? (
        formattedResources.map((item) => (
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
      ) : (
        <EmptyBanner />
      )}
    </>
  );
}
