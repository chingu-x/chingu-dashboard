import RedirectToCurrentSprintWrapper from "./components/RedirectToCurrentSprintWrapper";

interface SprintsPageProps {
  params: {
    teamId: string;
    sprintNumber: string;
  };
}

export default function SprintsPage({ params }: SprintsPageProps) {
  return <RedirectToCurrentSprintWrapper params={params} />;
}
