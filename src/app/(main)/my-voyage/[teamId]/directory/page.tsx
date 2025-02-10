import { Suspense } from "react";
import { Spinner } from "@chingu-x/components/spinner";
import DirectoryComponentWrapper from "./components/DirectoryComponentWrapper";

interface DirectoryPageProps {
  params: {
    teamId: string;
  };
}

export default function DirectoryPage({ params }: DirectoryPageProps) {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <DirectoryComponentWrapper params={params} />
      </Suspense>
    </>
  );
}
