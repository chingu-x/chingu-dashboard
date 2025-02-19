import { Suspense } from "react";
import { Spinner } from "@chingu-x/components/spinner";
import ResourcesComponentWrapper from "./components/ResourcesComponentWrapper";

interface ResourcesPageProps {
  params: {
    teamId: string;
  };
}

export default function ResourcesPage({ params }: ResourcesPageProps) {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <ResourcesComponentWrapper params={params} />
      </Suspense>
    </>
  );
}
