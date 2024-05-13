import { Suspense } from "react";
import FeaturesComponentWrapper from "./components/FeaturesComponentWrapper";
import Spinner from "@/components/Spinner";

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
