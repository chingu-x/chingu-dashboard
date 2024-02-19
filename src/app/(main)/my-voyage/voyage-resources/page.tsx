"use client";
import { useState } from "react";
import ResourceInput from "./components/ResourceInput";
import SortingButton from "./components/SortingButton";
import ResourceCard from "./components/ResourceCard";
import { resources } from "./components/fixtures/resources";
import Banner from "@/components/banner/Banner";
import Modal from "@/components/modals/Modal";
import Button from "@/components/Button";

export default function ResourcesPage() {
  const [ byNewest, setByNewest ] = useState(true);
  const [ deleteModal, setDeleteModal ] = useState(true);
  const [selectedResource, setSelectedResource ] = useState({id:undefined, title:""});

  const handleClick = () => {
    setByNewest(!byNewest);
  };
  const onClose= () => {
    setDeleteModal(!deleteModal);
  }
  const selectResource = (id:any, title:string) => {
    setSelectedResource({id, title});
    setDeleteModal(true)
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
        <SortingButton onClick={handleClick} type={byNewest} />
      </div>


      {resources.map((item) =>(
        <ResourceCard key={item.id} onClick={() => selectResource(item.id,item.title) }id={item.id} title={item.title} owner={item.owner} date={item.date} />
      ))}


      <Modal isOpen={deleteModal} title="Confirm Deletion?" onClose={onClose}>{
        <>
        {/**change to form */}
        <div className="bg-base-200 p-1 mb-4">
          <p className="font-bold">Are you sure you want to delete the resource you shared that is named:</p>
          <p>{selectedResource.title}</p>
        </div>
        <div className="flex justify-between w-full h-16">
          <Button size="lg" variant="neutral" className="w-3/6 m-1">Go Back</Button>
          <Button size="lg" variant="error" className="w-3/6 m-1">Delete</Button>
        </div>
        </>
      }</Modal>
      {/**add view modal as well */}
      {/**Create parent stateful 'client' component ???*/}
    </>
  );
}
