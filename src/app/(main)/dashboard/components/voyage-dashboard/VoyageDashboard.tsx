import React from "react";
import DashboardWidget from "./DashboardWidget";
import CheckInWidget from "./CheckInWidget";
import CalendarWidget from "./CalendarWidget";
import IdeationStateContent from "./IdeationStateContent";
import FeaturesStateContent from "./FeaturesStateContent";
import TechStackStateContent from "./TechStackStateContent";
import ResourcesStateContent from "./ResourcesStateContent";
import { type EventList, getDashboardData } from "./getDashboardData";
import {
  CHECKIN_STATUS,
  getFeaturesData,
  getIdeationData,
  getResourcesData,
  getTechStackData,
} from "@/app/(main)/dashboard/mocks/voyageDashboardData";
import VoyageSupport from "@/app/(main)/dashboard/components/shared/VoyageSupport";
import EmptySprintProvider from "@/app/(main)/my-voyage/[teamId]/sprints/providers/EmptySprintProvider";
import { getUser } from "@/utils/getUser";
import type { Sprint, Voyage } from "@/store/features/sprint/sprintSlice";
import { type ErrorType } from "@/utils/error";
import ErrorComponent from "@/components/Error";

interface VoyageDashboardProps {
  teamId?: string;
}
async function VoyageDashboard({ teamId }: VoyageDashboardProps) {
  //NOTE - Mocked value to show the filled state dashboard
  const filledState = true;
  const ideationData = filledState ? getIdeationData() : null;
  const featureData = filledState ? getFeaturesData() : null;
  const techStackData = filledState ? getTechStackData() : null;
  const resourceData = filledState ? getResourcesData() : null;

  const [user, error] = await getUser();

  let currentSprintNumber: number | null = null;
  let sprintsData: Sprint[] = [];
  let meetingsData: EventList[] = [];
  let voyageNumber: number | null = null;
  let voyageData: Voyage = {} as Voyage;
  let errorMessage: string | undefined;
  let errorType: ErrorType | undefined;

  if (teamId !== undefined) {
    const data = await getDashboardData(user, error, Number(teamId));
    currentSprintNumber = data.currentSprintNumber;
    sprintsData = data.sprintsData;
    meetingsData = data.meetingsData;
    voyageNumber = data.voyageNumber;
    voyageData = data.voyageData;
    errorMessage = data.errorMessage;
    errorType = data.errorType;
  }

  if (errorMessage && errorType) {
    return <ErrorComponent errorType={errorType} message={errorMessage} />;
  }

  return (
    <div className="flex w-full flex-col gap-x-6 max-[1470px]:gap-y-6 min-[1470px]:grid min-[1470px]:grid-cols-2">
      <div className="col-span-1 flex grow-[2] flex-col gap-y-6">
        <CalendarWidget
          sprintsData={sprintsData ?? undefined}
          currentSprintNumber={currentSprintNumber}
          meetingsData={meetingsData}
          voyageNumber={voyageNumber}
          teamId={teamId}
        />
        <CheckInWidget status={CHECKIN_STATUS} />
        <VoyageSupport />
      </div>
      <div className="col-span-1 flex w-full grow flex-col rounded-2xl border-2 border-base-100 bg-base-200 p-4">
        <p className="mb-[23px] text-[25px] font-semibold">
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
          <div className="flex flex-row justify-between gap-x-4 max-[1200px]:flex-col max-[1200px]:gap-y-4">
            <div className="flex w-full grow">
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
            <div className="flex w-full grow">
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
      <EmptySprintProvider voyage={voyageData} />
    </div>
  );
}

export default VoyageDashboard;
