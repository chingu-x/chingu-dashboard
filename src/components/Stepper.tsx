"use client";

import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";
// TODO FOR LATER REFACTOR:
//  - setting the width for the stepper: do we want to specify the width or base it off parent's width
//  - variant colors for stepper button

// chips or blocks
type StepperStyle = "chips" | "icons";
type StepperStatus = "completed" | "current" | "remaining";

export interface SteppersItem {
  // icon?: React.JSX.Element;
  icon?: string;
  status: StepperStatus;
  onClickEvent: () => void;
  name: string;
}

export interface StepperProps {
  styleType: StepperStyle;
  stepperWidth: string;
  steppers: SteppersItem[];
}

export default function Stepper({
  styleType,
  stepperWidth,
  steppers,
}: StepperProps) {
  return (
    <div className={`${stepperWidth}`}>
      <div className="flex">
        {steppers.map((step) => {
          const { icon, status, onClickEvent, name } = step;

          let chipBgColor: string = "bg-neutral";
          if (status === "current") chipBgColor = "bg-primary-content";
          if (status === "completed") chipBgColor = "bg-success-content";

          return (
            <div
              key={name}
              className={cn(
                "flex flex-1 last:flex-none relative last:after:contents-none after:absolute after:content-[''] after:h-[7px] after:w-full after:top-1/2 after:-translate-y-1/2 after:-z-10",
                "after:bg-base-100"
              )}
            >
              {styleType === "icons" ? (
                <Button
                  onClick={onClickEvent}
                  className={cn("text-center", styleType === "icons" && "flex")}
                  variant={status === "completed" ? "secondary" : "neutral"}
                >
                  <div>{icon}</div>
                  <span>{name}</span>
                  <ArrowRightIcon className="h-[18px] w-[18px]" />
                </Button>
              ) : (
                <div
                  className={cn(
                    "text-center w-[100px] h-[18px] rounded-full",
                    status === "current" && "border-2 border-neutral h-[20px]",
                    chipBgColor
                  )}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
