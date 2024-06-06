import React from "react";
import PreVoyageLinks from "./PreVoyageLinks";
import PreVoyageBanner from "./PreVoyageBanner";
import VoyageSupport from "@/app/(main)/dashboard/components/shared/VoyageSupport";

function PreVoyageDashboard() {
  return (
    <div className="flex flex-row gap-x-6">
      <div className="flex w-full grow flex-col gap-y-6">
        <div className="h-full w-full rounded-2xl border-2 border-base-100 bg-base-200 p-6">
          <div>
            <p className="text-[25px] font-semibold">
              Before your Voyage starts...
            </p>
            <p className="text-base font-medium">
              Explore Chingu&apos;s Knowledge Hub to prepare for your Voyage
              with information on tools, Agile, Scrum, Git, Teamwork, and more.
            </p>
          </div>
          <PreVoyageLinks />
        </div>
        <VoyageSupport />
      </div>
      <div className="flex w-full grow border-2 border-base-100">
        <PreVoyageBanner />
      </div>
    </div>
  );
}

export default PreVoyageDashboard;
