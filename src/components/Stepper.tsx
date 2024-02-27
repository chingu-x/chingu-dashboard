"use client";

import React from "react";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";

// TODO FOR LATER REFACTOR:
//  - setting the widths for the stepper: do we want to specify the width or base it off parent's width
//  - variant colors for stepper button

// chips or blocks
type StepperStyle = "chips" | "icons";
type StepperStatus = "completed" | "current" | "remaining";

const statusColor = {
  remaining: "bg-neutral",
  completed: "bg-success-content",
  current: "bg-success",
};

export interface SteppersItem {
  icon?: React.ReactNode;
  status: StepperStatus;
  onClickEvent?: () => void;
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
                  className={cn(
                    "text-center",
                    styleType === "icons" && "flex",
                    statusColor[status]
                  )}
                >
                  <div>{icon}</div>
                  <span>{name}</span>
                </Button>
              ) : (
                <div
                  className={cn(
                    "text-center w-[100px] h-[18px] rounded-full",
                    status === "current" && "border-2 border-neutral h-[20px]",
                    statusColor[status]
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
