"use client";
import React, { useState } from "react";
import ResourceInput from "./ResourceInput";
import SortingButton from "./SortingButton";
import ResourceCard from "./ResourceCard";
import EmptyBanner from "./EmptyBanner";
import { resources } from "./fixtures/resources";
//const resources = null // temp var for toggling empty banner or resource cards.

export default function ResourcesContainer() {
  const [byNewest, setByNewest] = useState(true);

  const sort = () => {
    setByNewest(!byNewest);
  };

  return (
    <>
      <div className="grid grid-cols-[1fr_150px] items-center">
        <ResourceInput />
        <SortingButton onClick={sort} type={byNewest} />
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
