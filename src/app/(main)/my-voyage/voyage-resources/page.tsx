"use client";
import React, { useState } from "react";
import ResourceInput from "./components/ResourceInput";
import SortingButton from "./components/SortingButton";
import ResourceCard from "./components/ResourceCard";
import ViewModal from "./components/ViewModal";
import DeleteModal from "./components/DeleteModal";
import { resources } from "./components/fixtures/resources";
import Banner from "@/components/banner/Banner";

export default function ResourcesPage() {
  const [ byNewest, setByNewest ] = useState(true);
  const [ deleteModalState, setDeleteModalState ] = useState(false);
  const [ viewModalState, setViewModalState ] = useState(false);
  const [selectedResource, setSelectedResource ] = useState({id:5, title:"A Title", link:"https://www.mozilla.org/en-US/"});

  const sort = () => {
    setByNewest(!byNewest);
  };
  const closeDeleteModal= () => {
    setDeleteModalState(!deleteModalState);
  }
  const closeViewModal = () => {
    setViewModalState(!viewModalState)
  }
  const deleteResource = (id:number, title:string, link:string) => {
    setSelectedResource({id, title, link});
    setDeleteModalState(true)
  }
  const viewResource = (id:number, title:string, link:string) => {
    setSelectedResource({id, title, link});
    setViewModalState(true)
  }
 

  return (
    <>
      <Banner
        //replace tech_stack pngs with resource page png's
        imageLight="/img/tech_stack_banner_light.png"
        imageDark="/img/tech_stack_banner_dark.png"
        alt="resources_banner"
        title="Resources"
        description="This resources page is your secret weapon for this voyage! Take a look at what your team is sharing or share your own resources for this voyage. Go ahead and be the first to post a new resource for you and your peers!"
      />      
      <div className="flex  items-center">
        <ResourceInput />
        <SortingButton onClick={sort} type={byNewest} />
      </div>
      {resources.map((item) =>(
        <ResourceCard 
          key={item.id} 
          deleteResource={() => deleteResource(item.id,item.title, item.link) }
          viewResource={() => viewResource(item.id,item.title, item.link)}
          id={item.id} 
          title={item.title} 
          owner={item.owner} 
          date={item.date} />
      ))}
      <DeleteModal
        selectedResource={selectedResource}
        viewing={deleteModalState}
        handleClose={closeDeleteModal}
      />
      <ViewModal 
        selectedResource={selectedResource} 
        viewing={viewModalState} 
        handleClose={closeViewModal}
      />
    </>
  );
}
