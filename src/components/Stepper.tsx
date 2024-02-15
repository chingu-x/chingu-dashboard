"use client";

import React from "react";
import Button, { ButtonProps } from "@/components/Button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
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

          //   the indicatorDisplay logic is to show the check icon for completion
          //   if the indicator is an icon instead of a number
          // const indicatorDisplay =
          //   typeof indicator !== "string" && status === "completed"
          //     ? "checked"
          //     : indicator;

          // REDO: change color variant
          let buttonVariant: ButtonProps["variant"] = "accent";
          if (status === "current") buttonVariant = "primary";
          if (status === "completed") buttonVariant = "secondary";

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
                className={cn(
                  "text-center",
                  styleType === "icons" && "flex",
                  styleType === "chips" && "w-[100px] h-[24px]"
                )}
                variant={buttonVariant}
              >
                <div>{styleType === "icons" && icon}</div>
                <span>{name}</span>
                <ArrowRightIcon className="h-[18px] w-[18px]" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
