// all pages should be server components

"use client";
import React, { useState } from "react";
import ResourceInput from "./components/ResourceInput";
import SortingButton from "./components/SortingButton";
import ResourceCard from "./components/ResourceCard";
import EmptyBanner from "./components/EmptyBanner";
import { resources } from "./components/fixtures/resources";
import Banner from "@/components/banner/Banner";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";
//const resources = null // temp var for toggling empty banner or resource cards.

export default function ResourcesPage() {
  const [byNewest, setByNewest] = useState(true);

  const sort = () => {
    setByNewest(!byNewest);
  };

  return (
    <>
      <VoyagePageBannerContainer
        title="Resources"
        description="This resources page is your secret weapon for this voyage! Take a look at what your team is sharing or share your own resources for this voyage. Go ahead and be the first to post a new resource for you and your peers!"
      >
        <Banner
          imageLight="/img/resources_banner_light.png"
          imageDark="/img/resources_banner_dark.png"
          alt="resources_banner"
          height="h-[200px]"
          width="w-[276px]"
        />
      </VoyagePageBannerContainer>
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
