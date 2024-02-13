import { Suspense } from "react";
import IdeationComponentWrapper from "./components/IdeationComponentWrapper";
import Spinner from "@/components/Spinner";

export default function IdeationPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <IdeationComponentWrapper />
    </Suspense>
  );
}
