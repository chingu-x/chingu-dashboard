"use client";

import React from "react";
import DashboardWidget from "./DashboardWidget";
import CheckInWidget from "./CheckInWidget";
import CalendarWidget from "./CalendarWidget";
import IdeationStateContent from "./IdeationStateContent";
import { CHECKIN_STATUS } from "./mocks/voyageDashboardData";
import FeaturesStateContent from "./FeaturesStateContent";
import TechStackStateContent from "./TechStackStateContent";
import ResourcesStateContent from "./ResourcesStateContent";
import useVoyageDashboardLogic from "./useVoyageDashboardLogic";
import VoyageSupport from "@/app/(main)/dashboard/components/shared/VoyageSupport";

function VoyageDashboard() {
  //NOTE - This is a custom hook that returns mock data based on the filledState
  const {
    ideationData,
    featureData,
    techStackData,
    resourceData,
    calendarData,
  } = useVoyageDashboardLogic(true);

  return (
    <div className="flex flex-row gap-x-6">
      <div className="flex flex-col gap-y-6 flex-grow-2 w-full">
        <CalendarWidget eventList={calendarData} />
        <CheckInWidget status={CHECKIN_STATUS} />
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
            link="/my-voyage/ideation"
            linkTitle="Ideation"
            buttonTitle="Go to Ideation"
            description="Share your ideas on what the team Voyage should be. Describe your
            vision to capture what it does and the benefit it will bring to
            users."
          >
            {ideationData ? (
              <IdeationStateContent contentObject={ideationData} />
            ) : null}
          </DashboardWidget>
          <div className="flex flex-row justify-between gap-x-4">
            <div className="flex flex-grow-1 w-full">
              <DashboardWidget
                title="What features will you develop?"
                link="/my-voyage/features"
                linkTitle="Features"
                buttonTitle="Go to Features"
                description="Brainstorm and prioritize the features that will be included in the scope of your project. "
              >
                {featureData ? (
                  <FeaturesStateContent contentObject={featureData} />
                ) : null}
              </DashboardWidget>
            </div>
            <div className="flex flex-grow-1 w-full">
              <DashboardWidget
                title="Choose your tech stack "
                link="/my-voyage/tech-stack"
                linkTitle="Tech Stack"
                buttonTitle="Go to Tech Stack"
                description="Choose the programming languages, frameworks, and tools that will serve as the foundation of your project."
              >
                {techStackData ? (
                  <TechStackStateContent contentObject={techStackData} />
                ) : null}
              </DashboardWidget>
            </div>
          </div>
          <DashboardWidget
            imageLight="/img/share_link_light.png"
            imageDark="/img/share_link_dark.png"
            title="Share resources with your team"
            link="/my-voyage/voyage-resources"
            linkTitle="Resources"
            buttonTitle="Go to Resources"
            description="Share links of helpful resources to your team for the Voyage. Contribute to the collective knowledgebase to empower your team."
          >
            {resourceData ? (
              <ResourcesStateContent contentObject={resourceData} />
            ) : null}
          </DashboardWidget>
        </div>
      </div>
    </div>
  );
}

export default VoyageDashboard;
