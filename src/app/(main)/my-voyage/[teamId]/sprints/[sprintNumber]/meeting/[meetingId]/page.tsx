import SprintWrapper from "@/myVoyage/sprints/components/SprintWrapper";

interface SprintPageProps {
  params: {
    teamId: string;
    sprintNumber: string;
    meetingId: string;
  };
}

export default function SprintPage({ params }: SprintPageProps) {
  return <SprintWrapper params={params} />;
}
