"use client";

import React from "react";
import PreVoyageLinks from "./PreVoyageLinks";
import PreVoyageBanner from "./PreVoyageBanner";
import VoyageSupport from "@/app/(main)/dashboard/components/shared/VoyageSupport";
import { useAuth } from "@/store/hooks";

function PreVoyageDashboard() {
  return (
    <div className="flex flex-row gap-x-6">
      <div className="flex flex-col gap-y-6 flex-grow-1 w-full">
        <div className="w-full h-full p-6 bg-base-200 rounded-2xl border-2 border-base-100">
          <div>
            <p className="text-[25px] font-semibold	">
              Before your Voyage starts...
            </p>
            <p className="font-medium	text-base">
              Explore Chingu&apos;s Knowledge Hub to prepare for your Voyage
              with information on tools, Agile, Scrum, Git, Teamwork, and more.
            </p>
          </div>
          <PreVoyageLinks />
        </div>
        <VoyageSupport />
      </div>
      <div className="flex flex-grow-1 w-full border-2 border-base-100">
        <PreVoyageBanner />
      </div>
    </div>
  );
}

function PreVoyageDashboardWrapper() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <PreVoyageDashboard />;
  }

  return null;
}

export default PreVoyageDashboardWrapper;
