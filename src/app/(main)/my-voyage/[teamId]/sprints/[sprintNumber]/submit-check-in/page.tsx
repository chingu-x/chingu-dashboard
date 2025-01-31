import WeeklyCheckInWrapper from "@/myVoyage/sprints/components/WeeklyCheckInWrapper";

interface WeeklyCheckInPageProps {
  params: {
    teamId: string;
    meetingId: string;
    sprintNumber: string;
  };
}

export default function WeeklyCheckInPage({ params }: WeeklyCheckInPageProps) {
  return <WeeklyCheckInWrapper params={params} />;
}
