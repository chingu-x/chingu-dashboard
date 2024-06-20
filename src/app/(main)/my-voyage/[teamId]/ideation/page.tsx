import IdeationComponentWrapper from "./components/IdeationComponentWrapper";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

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
