import React, { useState } from "react";
import FormWrapper from "@/app/(auth)/sign-up/(onboarding)/components/forms/FormWrapper";
import QuestionHeader from "@/app/(auth)/sign-up/(onboarding)/components/forms/QuestionHeader";
import FormSpacer from "@/app/(auth)/sign-up/(onboarding)/components/forms/FormsSpacer";
import { CheckboxGroupItem } from "@/components/inputs/CheckBoxGroup/CheckboxGroupItem";

interface Option {
  id: string;
  title: string;
  description: string;
}

const options: Option[] = [
  {
    id: "1",
    title: "Solidarity",
    description: "Being in a group of friendly coders who share my goals",
  },
  {
    id: "2",
    title: "Support",
    description: "Help when I get stuck on a coding problem",
  },
  {
    id: "3",
    title: "Challenge",
    description: "Getting out of my comfort zone",
  },
  {
    id: "4",
    title: "Specific Study Groups",
    description: "Either the #YDKJS or P1xt Guide study-groups",
  },
  {
    id: "5",
    title: "Teamwork",
    description: "Having access to team project experiences",
  },
  {
    id: "6",
    title: "Accountability",
    description: "Having an 'Accountability Buddy' to help me stay motivated",
  },
  {
    id: "7",
    title: "Workshops",
    description: "Video discussions topics and help sessions",
  },
  {
    id: "8",
    title: "Pair Programming",
    description: "Collaborative problem solving with peers",
  },
];

export default function WhatFeatures() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isAlreadySelected = selectedFeatures.includes(value);

    if (!isAlreadySelected && selectedFeatures.length >= 3) {
      e.target.checked = false;
      return;
    }

    setSelectedFeatures((prev) =>
      isAlreadySelected
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const isMaxReached = selectedFeatures.length >= 3;

  return (
    <FormWrapper>
      <div>
        <div className="gap-1">
          <QuestionHeader>
            What features are you most excited about?
          </QuestionHeader>
          <p className="mb-6 text-sm font-medium leading-4 text-base-300">
            (Maximum 3)
          </p>
        </div>

        <FormSpacer />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <div
            className="min-w-[220px] rounded-lg border border-neutral-content p-4"
            key={option.id}
          >
            <CheckboxGroupItem
              id={option.id}
              label={
                <div className="flex flex-col gap-2 text-base-300">
                  <h4 className="text-sm font-semibold leading-4">
                    {option.title}
                  </h4>
                  <p className="max-w-[245px] text-sm font-medium leading-4">
                    {option.description}
                  </p>
                </div>
              }
              value={option.id}
              checked={selectedFeatures.includes(option.id)}
              disabled={isMaxReached && !selectedFeatures.includes(option.id)}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
    </FormWrapper>
  );
}
