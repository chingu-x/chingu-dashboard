"use client";
import React, { useEffect, useState } from "react";
import ResourceInput from "./ResourceInput";
import SortingButton from "./SortingButton";
import ResourceCard from "./ResourceCard";
import EmptyBanner from "./EmptyBanner";
import { ResourceData } from "@/store/features/resources/resourcesSlice";
import { useSelector } from "react-redux";

type Resources ={
  resources: ResourceData[]
}
interface ResourcesContainerProps {
  resources: Resources
}

export default function ResourcesContainer() {
  const [byNewest, setByNewest] = useState(true);  
  {
    /*
    TODO: 
          1. getUser() to check if actual user or not (for deleting ability) *pass this from Wrapper parent server component.
    */
  }  
  const [ voyageResources, setVoyageResources ]= useState(useSelector( (state: ResourcesContainerProps ) => state.resources.resources))
  //const [ voyageResources, setVoyageResources ]= useState(null)

  const testList = voyageResources.map((item)=>{
      return {
        key: item.id,
        title:item.title,
        url:item.url,
        user:{
          name: item.addedBy.member.firstName,
          image: item.addedBy.member.avatar
        },
        date: new Date(item.updatedAt).toString(),
        currentUser:true //check if actual current user here if this is best ???      
    }
  });

const handleClick = () => {
  setByNewest(!byNewest);
};

useEffect(() => {
  setVoyageResources(sortResources());
},[byNewest])

const sortResources = () => {
  const sortedResources = [...voyageResources].sort(function (a, b) {
    const prev = new Date(a.updatedAt);
    const next = new Date(b.updatedAt);
    if (byNewest) {
      return next.getTime() - prev.getTime();
    } else {
      return prev.getTime() - next.getTime();
    }
  });
  return sortedResources;
};

  return (
    <>
      <div className="grid grid-cols-[1fr_150px] items-center">
        <ResourceInput />
        {/*TODO: replace 'resources' (fake data) with 'voyageResources'*/}
        {!voyageResources ? (
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
      {!voyageResources ? (
        <EmptyBanner />
      ) : (
        testList.map((item) => (
          <ResourceCard
            key={item.key}
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
