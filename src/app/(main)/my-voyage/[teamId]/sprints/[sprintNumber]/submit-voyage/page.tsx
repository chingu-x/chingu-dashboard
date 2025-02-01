import SubmitProjectWrapper from "@/myVoyage/sprints/components/SubmitProjectWrapper";

interface VoyageSubmissionPageProps {
  params: {
    teamId: string;
    meetingId: string;
    sprintNumber: string;
  };
}

export default function VoyageSubmissionPage({
  params,
}: VoyageSubmissionPageProps) {
  return <SubmitProjectWrapper params={params} />;
}
