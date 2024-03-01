"use client";

import React from "react";
import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import DashboardWidget from "./DashboardWidget";
import VoyageSupport from "@/app/(main)/dashboard/components/shared/VoyageSupport";
import Badge from "@/components/badge/Badge";
import Button from "@/components/Button";

function VoyageDashboard() {
  return (
    <div className="flex flex-row gap-x-6">
      <div className="flex flex-col gap-y-6 flex-grow-2 w-full">
        <div className="w-full h-full p-6 bg-base-200 rounded-2xl flex flex-row">
          <div className="w-max-[500px] min-h-[475px] flex justify-center items-center border">
            Calendar placeholder
          </div>
          <div className="pl-6 flex flex-col justify-between w-full">
            <div>
              <p className="text-xl font-semibold pb-3">Wednesday, May 4</p>
              <p className="rounded-lg bg-primary-content p-3 text-base font-medium w-[200px]">
                Sprint Week 1
              </p>
            </div>
            <Button className="self-end p-1 rounded text-base font-medium">
              Today
            </Button>
          </div>
        </div>
        <div className="bg-base-200 rounded-2xl flex flex-col p-6">
          <div className="flex flex-row pb-[9px] justify-between">
            <p className="text-xl font-semibold">Weekly Check-in</p>
            <Badge title="Pending Submission" variant="warning" />
          </div>
          <p className="pb-6 font-medium text-base">
            How did that last sprint with your team go?
          </p>
          <Button className="w-max-[200px] self-center text-base font-semibold">
            <DocumentCheckIcon width={14} />
            Submit Check-in
          </Button>
        </div>
        <VoyageSupport />
      </div>
      <div className="flex flex-grow-1 flex-col w-max-[650px] w-full bg-base-200 rounded-2xl p-4">
        <p className="text-[25px] font-semibold mb-[23px]">
          My Voyage Overview
        </p>
        <div className="flex flex-col gap-y-4">
          <DashboardWidget
            imageLight="/img/discover_light.png"
            imageDark="/img/discover_dark.png"
            title="What is your Voyage project idea & vision?"
            link="Ideation"
            buttonTitle="Go to Ideation"
            description="Share your ideas on what the team Voyage should be. Describe your
            vision to capture what it does and the benefit it will bring to
            users."
          />
          <div className="flex flex-row justify-between gap-x-4">
            <div className="flex flex-grow-1 w-full">
              <DashboardWidget
                title="What features will you develop?"
                link="Features"
                buttonTitle="Go to Features"
                description="Brainstorm and prioritize the features that will be included in the scope of your project. "
              />
            </div>
            <div className="flex flex-grow-1 w-full">
              <DashboardWidget
                title="Choose your tech stack "
                link="Tech Stack"
                buttonTitle="Go to Tech Stack"
                description="Choose the programming languages, frameworks, and tools that will serve as the foundation of your project."
              />
            </div>
          </div>
          <DashboardWidget
            imageLight="/img/share_link_light.png"
            imageDark="/img/share_link_dark.png"
            title="Share resources with your team"
            link="Resources"
            buttonTitle="Go to Resources"
            description="Share links of helpful resources to your team for the Voyage. Contribute to the collective knowledgebase to empower your team."
          />
        </div>
      </div>
    </div>
  );
}

export default VoyageDashboard;
