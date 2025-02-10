import { Suspense } from "react";
import { Spinner } from "@chingu-x/components/spinner";
import IdeationComponentWrapper from "./components/IdeationComponentWrapper";

interface IdeationPageProps {
  params: {
    teamId: string;
  };
}

export default function IdeationPage({ params }: IdeationPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <IdeationComponentWrapper params={params} />
    </Suspense>
  );
}
