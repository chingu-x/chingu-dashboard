import { Suspense } from "react";
import { Spinner } from "@chingu-x/components/spinner";
import FeaturesComponentWrapper from "./components/FeaturesComponentWrapper";

interface FeaturesPageProps {
  params: {
    teamId: string;
  };
}

export default function FeaturesPage({ params }: FeaturesPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <FeaturesComponentWrapper params={params} />
    </Suspense>
  );
}
