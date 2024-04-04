"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Button from "@/components/Button";
import routePaths from "@/utils/routePaths";

export default function FinalizeIdeationButton() {
  const { teamId } = useParams<{ teamId: string }>();

  return (
    <Link href={routePaths.finalizeIdeationPage(teamId)} className="w-full">
      <Button variant="secondary" size="lg" className="w-full">
        Finalize Selection
      </Button>
    </Link>
  );
}
