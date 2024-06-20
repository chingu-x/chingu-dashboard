"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Button from "@/components/Button";
import routePaths from "@/utils/routePaths";

export default function AddProjectIdeaButton() {
  const { teamId } = useParams<{ teamId: string }>();
  return (
    <Link href={routePaths.addIdeationPage(teamId)} className="w-full">
      <Button size="lg" className="w-full">
        Add Project
      </Button>
    </Link>
  );
}
