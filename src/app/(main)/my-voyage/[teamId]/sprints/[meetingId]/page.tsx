import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import SprintComponentWrapper from "@/sprints/components/SprintComponentWrapper";

interface SprintPageProps {
  params: {
    meetingId: string;
  };
}

export default function SprintPage({ params }: SprintPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <SprintComponentWrapper params={params} />
    </Suspense>
  );
}
