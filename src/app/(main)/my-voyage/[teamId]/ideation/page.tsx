import { Suspense } from "react";
import IdeationComponentWrapper from "./components/IdeationComponentWrapper";
import Spinner from "@/components/Spinner";

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
