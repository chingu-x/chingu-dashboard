import React from "react";
import Button from "./Button";

type StepperStyle = "chip" | "indicators";
const steps = ["1", "2", "3", "4", "5"];

const steppers = [
  { indicator: "1", status: "completed", onClickEvent: () => console.log("1") },
  { indicator: "2", status: "completed", onClickEvent: () => console.log("2") },
  { indicator: "3", status: "current", onClickEvent: () => console.log("3") },
  { indicator: "4", status: "remaining", onClickEvent: () => console.log("4") },
  { indicator: "5", status: "remaining", onClickEvent: () => console.log("5") },
  { indicator: "6", status: "remaining", onClickEvent: () => console.log("6") },
];

export interface StepperProps {
  styleType: StepperStyle;
  stepperWidth: string;
  // another prop that takes in the array of the stepper icons
  // will need a very strict rule on how to set the array up for the stepper
}

export default function Stepper({
  styleType = "chip",
  stepperWidth,
}: StepperProps) {
  return (
    // TODO: figure out parent width
    <div className={`${stepperWidth}`}>
      <ul className="flex">
        {steppers.map((step, idx) => {
          const { indicator, status, onClickEvent } = step;
          return (
            <li
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
                // onClick={onClickEvent}
                className={`text-center 
                ${styleType === "chip" && "w-[100px] h-[24px] rounded-full"}`}
                variant={`${
                  status === "current"
                    ? "secondary"
                    : status === "completed"
                      ? "primary"
                      : "accent"
                }`}
              >
                {indicator}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
