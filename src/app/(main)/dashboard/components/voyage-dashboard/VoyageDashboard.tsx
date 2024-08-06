import React from "react";
import {
  ComputerDesktopIcon,
  SwatchIcon,
  CodeBracketSquareIcon,
  ChartPieIcon,
  CloudIcon,
  ServerStackIcon,
} from "@heroicons/react/24/solid";
import DashboardWidget from "./DashboardWidget";
import CheckInWidget from "./CheckInWidget";
import CalendarWidget from "./CalendarWidget";
import IdeationStateContent from "./IdeationStateContent";
import FeaturesStateContent from "./FeaturesStateContent";
import TechStackStateContent from "./TechStackStateContent";
import ResourcesStateContent from "./ResourcesStateContent";
import { type Event, getDashboardData } from "./getDashboardData";
import VoyageSupport from "@/app/(main)/dashboard/components/shared/VoyageSupport";
import EmptySprintProvider from "@/app/(main)/my-voyage/[teamId]/sprints/providers/EmptySprintProvider";
import { getUser } from "@/utils/getUser";
import type { Sprint, Voyage } from "@/store/features/sprint/sprintSlice";
import { type FeaturesList } from "@/store/features/features/featuresSlice";
import { type IdeationData } from "@/store/features/ideation/ideationSlice";
import { type TechStackData } from "@/store/features/techStack/techStackSlice";
import { type ResourceData } from "@/store/features/resources/resourcesSlice";
import ResourcesProvider from "@/app/(main)/my-voyage/[teamId]/voyage-resources/components/ResourcesProvider";
import FeaturesProvider from "@/app/(main)/my-voyage/[teamId]/features/components/FeaturesProvider";
import IdeationProvider from "@/app/(main)/my-voyage/[teamId]/ideation/components/IdeationProvider";
import TechStackProvider from "@/app/(main)/my-voyage/[teamId]/tech-stack/components/TechStackProvider";
import routePaths from "@/utils/routePaths";
import { type ErrorType } from "@/utils/error";
import ErrorComponent from "@/components/Error";

interface VoyageDashboardProps {
  teamId?: string;
}
async function VoyageDashboard({ teamId }: VoyageDashboardProps) {
  const [user, error] = await getUser();

  // TODO: Mocked value
  const CHECKIN_STATUS = "Due today";

  let currentSprintNumber: number | null = null;
  let sprintsData: Sprint[] = [];
  let meetingsData: Event[] = [];
  let voyageNumber: number | null = null;
  let voyageData: Voyage = {} as Voyage;
  let features: FeaturesList[] = [];
  let projectIdeas: IdeationData[] = [];
  let techStackDatas: TechStackData[] = [];
  let projectResources: ResourceData[] = [];
  let errorMessage: string | undefined;
  let errorType: ErrorType | undefined;

  if (teamId !== undefined) {
    const data = await getDashboardData(user, error, Number(teamId));
    currentSprintNumber = data.currentSprintNumber;
    sprintsData = data.sprintsData;
    meetingsData = data.meetingsData;
    voyageNumber = data.voyageNumber;
    voyageData = data.voyageData;
    features = data.features;
    projectIdeas = data.projectIdeas.filter((idea) => idea.isSelected);
    techStackDatas = data.techStackData.filter((tech) => tech.isSelected);
    projectResources = data.projectResources;
    errorMessage = data.errorMessage;
    errorType = data.errorType;
  }

  if (errorMessage && errorType) {
    return <ErrorComponent errorType={errorType} message={errorMessage} />;
  }

  const featureList = features
    .filter((item) => item.categoryName === "must have")
    .flatMap((category) =>
      category.features.map((feature) => feature.description),
    );

  const resourceList = projectResources.map((resource) => ({
    id: resource.id,
    title: resource.title,
    resourceUrl: resource.url,
    userFirstName: resource.addedBy.member.firstName,
    userLastName: resource.addedBy.member.lastName,
    userAvatarUrl: resource.addedBy.member.avatar,
  }));

  const iconMapping = {
    Frontend: ComputerDesktopIcon,
    "CSS Library": SwatchIcon,
    Backend: CodeBracketSquareIcon,
    "Project Management": ChartPieIcon,
    "Cloud Provider": CloudIcon,
    Hosting: ServerStackIcon,
  };

  type TechStackName =
    | "Frontend"
    | "CSS Library"
    | "Backend"
    | "Project Management"
    | "Cloud Provider"
    | "Hosting";

  const techStackList = techStackDatas.map((techStackData) => ({
    title: techStackData.name,
    icon: iconMapping[techStackData.name as TechStackName],
    value: techStackData.teamTechStackItems.map((item) => item.name).join(", "),
  }));

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
            link={routePaths.ideationPage(teamId ?? "")}
            headerTitle="Ideation"
            buttonTitle="Go to Ideation"
            description="Share your ideas on what the team Voyage should be. Describe your vision and finalize your choice to capture what the benefit it will bring to users."
          >
            {projectIdeas.length > 0 ? (
              <IdeationStateContent contentObject={projectIdeas[0]} />
            ) : null}
          </DashboardWidget>
          <div className="flex flex-row justify-between gap-x-4 max-[1200px]:flex-col max-[1200px]:gap-y-4">
            <div className="flex w-full grow">
              <DashboardWidget
                title="What features will you develop?"
                link={routePaths.featuresPage(teamId ?? "")}
                headerTitle="Features"
                buttonTitle="Go to Features"
                description="Brainstorm and prioritize the features that will be included in the scope of your project."
              >
                {featureList.length > 0 ? (
                  <FeaturesStateContent contentObject={featureList} />
                ) : null}
              </DashboardWidget>
            </div>
            <div className="flex w-full grow">
              <DashboardWidget
                title="Choose your tech stack"
                link={routePaths.techStackPage(teamId ?? "")}
                headerTitle="Tech Stack"
                buttonTitle="Go to Tech Stack"
                description="The final choices for the programming languages, frameworks, and tools that will serve as the foundation of your project will appear here."
              >
                {techStackList.some((item) => item.value) ? (
                  <TechStackStateContent contentObject={techStackList} />
                ) : null}
              </DashboardWidget>
            </div>
          </div>
          <DashboardWidget
            imageLight="/img/share_link_light.png"
            imageDark="/img/share_link_dark.png"
            title="Share resources with your team"
            link={routePaths.voyageResourcesPage(teamId ?? "")}
            headerTitle="Resources"
            buttonTitle="Go to Resources"
            description="Share links of helpful resources to your team for the Voyage. Contribute to the collective knowledgebase to empower your team."
          >
            {resourceList.length > 0 ? (
              <ResourcesStateContent contentObject={resourceList} />
            ) : null}
          </DashboardWidget>
        </div>
      </div>
      <EmptySprintProvider voyage={voyageData} />
      <ResourcesProvider payload={projectResources} />
      <FeaturesProvider payload={features} />
      <IdeationProvider payload={projectIdeas} />
      <TechStackProvider payload={techStackDatas} />
    </div>
  );
}

export default VoyageDashboard;
