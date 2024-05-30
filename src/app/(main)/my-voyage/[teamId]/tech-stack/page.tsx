import { Suspense } from "react";
import TechStackComponentWrapper from "./components/TechStackComponentWrapper";
import Spinner from "@/components/Spinner";

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
