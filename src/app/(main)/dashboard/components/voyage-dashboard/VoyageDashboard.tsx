"use client";

import React from "react";
import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import VoyageSupport from "@/app/(main)/dashboard/components/shared/VoyageSupport";
import Badge from "@/components/badge/Badge";
import Button from "@/components/Button";

function VoyageDashboard() {
  return (
    <div className="flex flex-row gap-x-6">
      <div className="flex flex-col gap-y-6 flex-grow-1 w-full">
        <div className="w-full h-full p-6 bg-base-200 rounded-2xl flex flex-row">
          <div className="w-[500px] h-[475px] flex justify-center items-center border">
            Calendar placeholder
          </div>
          <div className="pl-6 flex flex-col justify-between">
            <div>
              <p className="text-xl font-semibold pb-3">Wednesday, May 4</p>
              <p className="rounded-lg bg-primary-content p-3 text-base font-medium w-[200px]">
                Sprint Week 1
              </p>
            </div>
            <Button className="self-end p-1 rounded text-base font-medium">
              Today
            </Button>
          </div>
        </div>
        <div className="bg-base-200 rounded-2xl flex flex-col p-6">
          <div className="flex flex-row pb-[9px] justify-between">
            <p className="text-xl font-semibold">Weekly Check-in</p>
            <Badge title="Pending Submission" variant="warning" />
          </div>
          <p className="pb-6 font-medium text-base">
            How did that last sprint with your team go?
          </p>
          <Button className="w-max-[200px] self-center text-base font-semibold">
            <DocumentCheckIcon width={14} />
            Submit Check-in
          </Button>
        </div>
        <VoyageSupport />
      </div>
      <div className="flex flex-grow-1 flex-col w-full bg-base-200 rounded-2xl p-4">
        <p className="text-[25px] font-semibold mb-[23px]">
          My Voyage Overview
        </p>
        <div className="flex flex-col gap-y-4">
          <div className="rounded-lg bg-base-100 p-4">
            <p className="text-[13px] font-semibold text-neutral-focus pb-4">
              Ideation
            </p>
            <div className="flex flex-row">
              <div className="flex flex-col gap-y-4">
                <p className="text-xl font-semibold">
                  What is your Voyage project idea & vision?
                </p>
                <p className="text-base font-medium">
                  Share your ideas on what the team Voyage should be. Describe
                  your vision to capture what it does and the benefit it will
                  bring to users.
                </p>
                <Button variant="outline" className="text-base font-semibold">
                  Go to Ideation
                </Button>
              </div>
              <div className="w-full">
                <div
                  data-hide-on-theme="dark"
                  className="flex h-[140px] w-full relative shrink-0"
                >
                  <Image
                    src="/img/discover_light.png"
                    alt="Light pre Voyage image"
                    fill={true}
                    style={{ objectFit: "contain" }}
                    priority={true}
                  />
                </div>
                <div
                  data-hide-on-theme="light"
                  className="flex h-[140px] w-full relative shrink-0"
                >
                  <Image
                    src="/img/discover_dark.png"
                    alt="Light pre Voyage image"
                    fill={true}
                    style={{ objectFit: "contain" }}
                    priority={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="rounded-lg bg-base-100 p-4">
              <p className="text-[13px] font-semibold text-neutral-focus pb-4">
                Features
              </p>
            </div>
            <div className="rounded-lg bg-base-100 p-4">
              <p className="text-[13px] font-semibold text-neutral-focus pb-4">
                Tech Stack
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-base-100 p-4">
            <p className="text-[13px] font-semibold text-neutral-focus pb-4">
              Resources
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoyageDashboard;
