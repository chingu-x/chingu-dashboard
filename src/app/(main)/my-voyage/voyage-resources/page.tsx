"use client";
import React, { ReactHTMLElement, useState } from "react";
import Link from "next/link";
import ResourceInput from "./components/ResourceInput";
import SortingButton from "./components/SortingButton";
import ResourceCard from "./components/ResourceCard";
import { resources } from "./components/fixtures/resources";
import Banner from "@/components/banner/Banner";
import Modal from "@/components/modals/Modal";
import Button from "@/components/Button";

export default function ResourcesPage() {
  const [ byNewest, setByNewest ] = useState(true);
  const [ deleteModal, setDeleteModal ] = useState(false);
  const [ viewModal, setViewModal ] = useState(true);
  const [selectedResource, setSelectedResource ] = useState({id:5, title:"A Title", link:"https://www.mozilla.org/en-US/"});

  const handleClick = () => {
    setByNewest(!byNewest);
  };
  const closeDeleteModal= () => {
    setDeleteModal(!deleteModal);
  }
  const closeViewModal= () => {
    setViewModal(!viewModal);
  }
  const selectResource = (id:number, title:string, link:string) => {
    setSelectedResource({id, title, link});
    setDeleteModal(true)
  }
  const deleteResource = (event:any) => {
    //Todo:
    //replace with delete req. to be.
    event.preventDefault()
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
        <ResourceCard key={item.id} onClick={() => selectResource(item.id,item.title, item.link) }id={item.id} title={item.title} owner={item.owner} date={item.date} />
      ))}


      <Modal isOpen={deleteModal} title="Confirm Deletion?" onClose={closeDeleteModal}>{
        <form>
           <ModalSection heading="Are you sure you would like to visit this resource?">
            {<p>{selectedResource.title}</p>}
          </ModalSection>         
          <div className="flex justify-between w-full h-16">
            <Button size="lg" variant="neutral" onClick={closeDeleteModal} className="w-3/6 m-1">Go Back</Button>
            <Button type="submit" size="lg" variant="error" onSubmit={deleteResource} className="w-3/6 m-1">Delete</Button>
          </div>
        </form>
      }</Modal>


      <Modal isOpen={viewModal} title="View Resource?" onClose={closeViewModal}>{
        <form>
          <ModalSection heading="Are you sure you would like to visit this resource?">
            {<p>{selectedResource.title}</p>}
          </ModalSection>          
          <ModalSection heading="Are you sure you would like to visit this resource?">
            {
              <Link 
                href={selectedResource.link} 
                rel="noopener noreferrer" 
                target="_blank"
                >
                  {selectedResource.link}
              </Link>}
          </ModalSection>          
          <ModalSection heading="Would you like to see this message again?">
            {
              <>
                <input className="mr-2" type="checkbox" />
                <label>
                  Don't ask me this again when opening resources links.
                </label>
              </>
            }
          </ModalSection>          
          <div className="flex justify-between w-full h-16">
            <Button size="lg" variant="neutral" onClick={closeViewModal} className="w-3/6 m-1">Go Back</Button>
            <Button type="submit" size="lg" variant="primary" onSubmit={deleteResource} className="w-3/6 m-1">Continue</Button>
          </div>
        </form>
      }</Modal>
      
    </>
  );
}

function ModalSection ({heading, children}:{heading:string, children:React.ReactNode}) {
  return(
    <div className="bg-base-200 p-1 mb-4">
      <p className="font-bold">{heading}</p>
      {children}
    </div>
  )
}