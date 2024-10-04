"use client";
import React, { useEffect, useState } from "react";
import ResourceInput from "./ResourceInput";
import SortingButton from "./SortingButton";
import ResourceCard from "./ResourceCard";
import EmptyBanner from "./EmptyBanner";
import { type ResourceData } from "@/store/features/resources/resourcesSlice";

interface ResourceContainerProps {
  data: ResourceData[];
}

export default function ResourcesContainer({ data }: ResourceContainerProps) {
  const [byNewest, setByNewest] = useState(true);
  const [voyageResources, setVoyageResources] = useState(data);

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
    setVoyageResources(data);
  }, [data]);

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
      <div className="flex flex-col gap-y-6">
        {formattedResources?.length ? (
          formattedResources.map((item) => (
            <ResourceCard
              key={item.id}
              resourceId={item.id}
              title={item.title}
              user={item.addedBy.member}
              date={item.date}
              userId={item.addedBy.member.id}
              url={item.url}
            />
          ))
        ) : (
          <EmptyBanner />
        )}
      </div>
    </>
  );
}
