"use client";

import React from "react";
import Button from "@/components/Button";
import { ButtonProps } from "@/components/Button";

type StepperStyle = "chip" | "indicators";
type StepperStatus = "completed" | "current" | "remaining";

export interface SteppersItem {
  indicator: string | React.JSX.Element;
  status: StepperStatus;
  onClickEvent: () => void;
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
        {steppers.map((step, idx) => {
          const { indicator, status, onClickEvent } = step;

          const indicatorDisplay =
            typeof indicator !== "string" && status === "completed"
              ? "checked"
              : indicator;

          let buttonVariant: ButtonProps["variant"] = "accent";

          if (status === "current") buttonVariant = "secondary";
          if (status === "completed") buttonVariant = "primary";

          return (
            <div
              key={idx}
              className={`flex flex-1 last:flex-none relative
              last:after:contents-none after:absolute
              after:content-[''] after:h-[7px]
              ${
                status === "completed"
                  ? "after:bg-primary"
                  : "after:bg-base-100"
              }
              after:w-full after:top-1/2 after:-translate-y-1/2 after:-z-10
            `}
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
