import { Suspense } from "react";
import TeamDirectory from "./components/TeamDirectory";
import Spinner from "@/components/Spinner";

interface DirectoryPageProps {
  params: {
    teamId: string;
  };
}

export default function DirectoryPage({ params }: DirectoryPageProps) {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <TeamDirectory params={params} />
      </Suspense>
    </>
  );
}
