"use client";
import React from "react";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";

type StepperStyle = "chips" | "icons";
type StepperStatus = "completed" | "current" | "remaining";

const statusColor = {
  remaining: "bg-neutral",
  completed: "bg-success-content",
  current: "bg-success",
};

const statusVariant: Record<string, "neutral" | "primary"> = {
  remaining: "neutral",
  completed: "primary",
  current: "primary",
};

export interface SteppersItem {
  icon?: React.ReactNode;
  status: StepperStatus;
  onClickEvent?: () => void;
  name: string;
  isActive: boolean;
}

export interface StepperProps {
  styleType: StepperStyle;
  stepperWidth?: string;
  steppers: SteppersItem[];
}

export default function Stepper({
  styleType,
  stepperWidth,
  steppers,
}: StepperProps) {
  return (
    <div className="flex justify-center">
      <div className={`${stepperWidth ? stepperWidth : "w-[1000px]"}`}>
        <div className="flex">
          {steppers.map((step) => {
            const { icon, status, onClickEvent, name, isActive } = step;

            return (
              <div
                key={name}
                className={cn(
                  "last:after:contents-none relative flex flex-1 after:absolute after:top-1/2 after:-z-10 after:h-[7px] after:w-full after:-translate-y-1/2 after:content-[''] last:flex-none",
                  "after:bg-base-100",
                )}
              >
                {styleType === "icons" ? (
                  <Button
                    onClick={onClickEvent}
                    className={cn("min-w-[75px]")}
                    disabled={status === "remaining"}
                    variant={isActive ? "outline" : statusVariant[status]}
                  >
                    {status === "current" && <div>{icon}</div>}
                    <span>{name}</span>
                  </Button>
                ) : (
                  <div
                    className={cn(
                      "h-[18px] w-[100px] rounded-full text-center",
                      status === "current" &&
                        "h-[20px] border-2 border-neutral",
                      statusColor[status],
                    )}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
