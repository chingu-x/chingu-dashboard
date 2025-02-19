import { Suspense } from "react";
import { Spinner } from "@chingu-x/components/spinner";
import TechStackComponentWrapper from "./components/TechStackComponentWrapper";

interface TechStackPageProps {
  params: {
    teamId: string;
  };
}

export default function TeckStackPage({ params }: TechStackPageProps) {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <TechStackComponentWrapper params={params} />
      </Suspense>
    </>
  );
}
