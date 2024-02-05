"use client";

import React from "react";
import Button, { ButtonProps } from "@/components/Button";
import { cn } from "@/lib/utils";

// TODO FOR LATER REFACTOR:
//  - setting the width for the stepper: do we want to specify the width or base it off parent's width
//  - variant colors for stepper button

type StepperStyle = "chip" | "indicators";
type StepperStatus = "completed" | "current" | "remaining";

export interface SteppersItem {
  indicator: string | React.JSX.Element;
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
          const { indicator, status, onClickEvent, name } = step;

          //   the indicatorDisplay logic is to show the check icon for completion
          //   if the indicator is an icon instead of a number
          const indicatorDisplay =
            typeof indicator !== "string" && status === "completed"
              ? "checked"
              : indicator;

          let buttonVariant: ButtonProps["variant"] = "accent";
          if (status === "current") buttonVariant = "secondary";
          if (status === "completed") buttonVariant = "primary";

          return (
            <div
              key={name}
              className={cn(
                "flex flex-1 last:flex-none relative last:after:contents-none after:absolute after:content-[''] after:h-[7px] after:w-full after:top-1/2 after:-translate-y-1/2 after:-z-10",
                status === "completed"
                  ? "after:bg-primary"
                  : "after:bg-base-100"
              )}
            >
              <Button
                onClick={onClickEvent}
                className={`text-center rounded-full ${
                  styleType === "chip" ? "w-[100px] h-[24px]" : "w-[45px]"
                }`}
                variant={buttonVariant}
              >
                {indicatorDisplay}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
