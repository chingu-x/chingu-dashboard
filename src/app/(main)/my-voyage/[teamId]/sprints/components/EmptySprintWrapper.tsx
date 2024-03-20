import ProgressStepper from "./ProgressStepper";

import EmptyState from "./EmptyState";
import SprintActions from "./SprintActions";
import Banner from "@/components/banner/Banner";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";

interface SprintWrapperProps {
  params: {
    teamId: string;
    sprintNumber: string;
  };
}

export default function SprintWrapper({ params }: SprintWrapperProps) {
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
      <ProgressStepper />
      <SprintActions
        teamId={params.teamId}
        sprintNumber={params.sprintNumber}
      />
      <EmptyState />
    </div>
  );
}
