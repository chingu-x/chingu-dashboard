import { Suspense } from "react";
import ResourcesComponentWrapper from "./components/ResourcesComponentWrapper";
import Spinner from "@/components/Spinner";

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
