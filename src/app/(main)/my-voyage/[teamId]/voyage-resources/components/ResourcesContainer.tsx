"use client";
import React, { useEffect, useState } from "react";
import ResourceInput from "./ResourceInput";
import SortingButton from "./SortingButton";
import ResourceCard from "./ResourceCard";
import EmptyBanner from "./EmptyBanner";
import { ResourceData } from "@/store/features/resources/resourcesSlice";
import { useSelector } from "react-redux";

type Resources = {
  resources: ResourceData[] | null;
};
interface ResourcesContainerProps {
  resources: Resources;
}

export default function ResourcesContainer() {
  const [byNewest, setByNewest] = useState(true);
  const initialResourcesState = useSelector(
    (state: ResourcesContainerProps) => state.resources.resources,
  );
  const [voyageResources, setVoyageResources] = useState(initialResourcesState);

  const mapResources = (resources: ResourceData[] | null) => {
    return resources?.map((item) => ({
      key: item.id,
      title: item.title,
      url: item.url,
      user: {
        name: item.addedBy.member.firstName,
        image: item.addedBy.member.avatar,
      },
      date: new Date(item.updatedAt).toString(),
      userId: item.teamMemberId,
    }));
  };

  const sortResources = (resources: ResourceData[] | null) => {
    return resources?.slice().sort(function (a, b) {
      const prev = new Date(a.updatedAt);
      const next = new Date(b.updatedAt);
      if (byNewest) {
        return next.getTime() - prev.getTime();
      } else {
        return prev.getTime() - next.getTime();
      }
    });
  };

  const handleClick = () => {
    setByNewest(!byNewest);
  };

  useEffect(() => {
    setVoyageResources(initialResourcesState);
  }, [initialResourcesState]);

  useEffect(() => {
    const sortedResources = sortResources(voyageResources);
    if (sortedResources !== undefined) {
      setVoyageResources(sortedResources);
    }
  }, [byNewest]);

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
          />
        ))
      )}
    </>
  );
}
