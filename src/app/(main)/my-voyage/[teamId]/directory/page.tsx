import { Suspense } from "react";
import DirectoryComponentWrapper from "./components/DirectoryComponentWrapper";
import Spinner from "@/components/Spinner";

interface DirectoryPageProps {
  params: {
    teamId: string;
  };
}

export default function DirectoryPage({ params }: DirectoryPageProps) {
  return <DirectoryComponentWrapper params={params} />;
}
