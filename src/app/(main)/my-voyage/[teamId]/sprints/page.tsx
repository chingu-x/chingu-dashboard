// import VoyageSubmittedMessage from "./components/VoyageSubmittedMessage";
// import EmptyState from "./components/EmptyState";
// import Agenda from "./components/agenda/Agenda";
// import MeetingOverview from "./components/MeetingOverview";
// import Sections from "./components/sections/Sections";
// import SprintActions from "./components/SprintActions";
// import ProgressStepper from "./components/ProgressStepper";
import Banner from "@/components/banner/Banner";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";

interface SprintsPageProps {
  params: {
    teamId: string;
  };
}

export default function SprintsPage({ params }: SprintsPageProps) {
  console.log(params.teamId);
  //

  return (
    <div className="flex flex-col w-full gap-y-10">
      <VoyagePageBannerContainer
        title="Sprints"
        description="A sprint agenda helps the team stay on track, communicate well, and improve. Basically, it's like speed dating for developers. Except we're not looking for a soulmate, we're just trying to get some quality work done."
      >
        <Banner
          imageLight="/img/sprints_banner_light.png"
          imageDark="/img/sprints_banner_dark.png"
          alt="sprints_banner"
          height="h-[200px]"
          width="w-[276px]"
        />
      </VoyagePageBannerContainer>
      {/* <ProgressStepper /> */}
      {/* <SprintActions /> */}
      {/* <EmptyState /> */}
      {/* <MeetingOverview /> */}
      {/* <Agenda /> */}
      {/* <VoyageSubmittedMessage /> */}
      {/* <Sections /> */}
    </div>
  );
}
