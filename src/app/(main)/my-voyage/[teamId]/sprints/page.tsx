// import VoyageSubmittedMessage from "./components/VoyageSubmittedMessage";
// import EmptyState from "./components/EmptyState";
import Agenda from "./components/agenda/Agenda";
import MeetingOverview from "./components/MeetingOverview";
import SprintActions from "./components/SprintActions";
import Banner from "@/components/banner/Banner";

export default function SprintsPage() {
  return (
    <div className="flex flex-col w-full gap-y-10">
      <Banner
        imageLight="/img/sprints_banner_light.png"
        imageDark="/img/sprints_banner_dark.png"
        alt="sprints_banner"
        title="Sprints"
        description="A sprint agenda helps the team stay on track, communicate well, and improve. Basically, it's like speed dating for developers. Except we're not looking for a soulmate, we're just trying to get some quality work done."
      />
      <SprintActions />
      {/* <EmptyState /> */}
      <MeetingOverview />
      <Agenda />
      {/* <VoyageSubmittedMessage /> */}
    </div>
  );
}
