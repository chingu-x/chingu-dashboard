import { Suspense } from "react";
import ResourcesComponentWrapper from "./components/ResourcesComponentWrapper";
import Spinner from "@/components/Spinner";

export default function ResourcesPage() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <ResourcesComponentWrapper />
      </Suspense>
    </>
  );
}
