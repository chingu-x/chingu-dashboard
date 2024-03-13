import { Suspense } from "react";

import SprintsLoaderWrapper from "./components/SprintsLoaderWrapper";
import Spinner from "@/components/Spinner";

interface SprintsPageProps {
  params: {
    teamId: string;
  };
}

export default function SprintsPage({ params }: SprintsPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <SprintsLoaderWrapper params={params} />
    </Suspense>
  );
}
