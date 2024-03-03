"use client";
import React from "react";
import PreVoyageDashboard from "./components/PreVoyageDashboard";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import Stepper, { SteppersItem } from "@/components/Stepper";

const steppers: SteppersItem[] = [
  {
    icon: <EnvelopeIcon className="h-[1.125rem]" />,
    name: "Sprint 1",
    status: "completed",
    onClickEvent: () => console.log("1"),
    isActive: false,
  },
  {
    icon: <EnvelopeIcon className="h-[1.125rem]" />,
    name: "Sprint 2",
    status: "completed",
    onClickEvent: () => console.log("2"),
    isActive: true,
  },
  {
    icon: <EnvelopeIcon className="h-[1.125rem]" />,
    name: "Sprint 3",
    status: "current",
    onClickEvent: () => console.log("3"),
    isActive: false,
  },
  {
    icon: <EnvelopeIcon className="h-[1.125rem]" />,
    name: "Sprint 4",
    status: "remaining",
    onClickEvent: () => console.log("4"),
    isActive: false,
  },
  {
    icon: <EnvelopeIcon className="h-[1.125rem]" />,
    name: "Sprint 5",
    status: "remaining",
    onClickEvent: () => console.log("5"),
    isActive: false,
  },
  {
    icon: <EnvelopeIcon className="h-[1.125rem]" />,
    name: "Sprint 6",
    status: "remaining",
    onClickEvent: () => console.log("6"),
    isActive: false,
  },
];

function DashboardPage() {
  return (
    <>
      <PreVoyageDashboard />
      <Stepper styleType="icons" steppers={steppers} />
    </>
  );
}

export default DashboardPage;
