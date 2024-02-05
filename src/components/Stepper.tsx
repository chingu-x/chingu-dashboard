import React from "react";

type StepperStyle = "chip" | "indicators";
const steps = ["1", "2", "3", "4"];

export interface StepperProps {
  styleType: StepperStyle;

  // another prop that takes in the array of the stepper icons
  // will need a very strict rule on how to set the array up for the stepper
}

// className = "border border-yellow-500 before:content-[''] before:w-12 before:h-12 before:relative before:z-[1] before:block before:rounded-full flex flex-1 flex-col items-center";

export default function Stepper({ styleType = "chip" }: StepperProps) {
  return (
    // TODO: figure out parent width
    <div className="w-[1000px]">
      <ul className="flex">
        {steps.map((step, idx) => {
          return (
            <li
              className="flex flex-1 last:flex-none relative
              last:after:content-none after:absolute
              after:content-[''] after:h-[8px] after:bg-base-100 after:w-full
              after:translate-y-full after:-z-10 after:left-1
            "
            >
              <div
                className={`text-center text-base-300 bg-base-100 border-base-100 ${
                  styleType === "chip" && "w-[100px] h-[24px] rounded-full"
                }`}
              >
                {step}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
