import React, { useState } from "react";
import CheckboxGroup from "@/components/inputs/CheckBoxGroup/CheckboxGroupVertical";
import FormWrapper from "@/app/(auth)/sign-up/(onboarding)/components/forms/FormWrapper";
import QuestionHeader from "@/app/(auth)/sign-up/(onboarding)/components/forms/QuestionHeader";
import FormSpacer from "@/app/(auth)/sign-up/(onboarding)/components/forms/FormsSpacer";

interface Option {
  id: string;
  title: string;
  description: string;
}

const optionsDataFirstCol: Option[] = [
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
];

const optionsDataSecondCol: Option[] = [
  {
    id: "5",
    title: "Teamwork",
    description: "Having access to team project experiences",
  },
  {
    id: "6",
    title: "Accountability",
    // eslint-disable-next-line quotes
    description: 'Having an "Accountability Buddy" to help me stay motivated',
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

    // If the feature is not already selected and maximum (3) is reached,
    // revert the change on the DOM and do nothing.
    if (!isAlreadySelected && selectedFeatures.length >= 3) {
      e.target.checked = false;
      return;
    }

    setSelectedFeatures((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }
      return [...prev, value];
    });
  };

  // When three items are selected, disable the unchecked ones.
  const isMaxReached = selectedFeatures.length >= 3;

  const formatOption = (option: Option) => ({
    id: option.id,
    value: option.id,
    label: (
      <div className="flex flex-col gap-2 text-base-300">
        <h4 className="text-sm font-semibold leading-4">{option.title}</h4>
        <p className="max-w-[245px] text-sm font-medium leading-4">
          {option.description}
        </p>
      </div>
    ),
    checked: selectedFeatures.includes(option.id),
    // Disable this option if it’s not already selected and max count is reached.
    disabled: isMaxReached && !selectedFeatures.includes(option.id),
  });

  const optionsFirstCol = optionsDataFirstCol.map(formatOption);
  const optionsSecondCol = optionsDataSecondCol.map(formatOption);

  return (
    <FormWrapper>
      <QuestionHeader>What features are you most excited about?</QuestionHeader>
      <p className="mb-6 text-sm font-medium leading-4 text-base-300">
        (Maximum 3)
      </p>
      <FormSpacer />
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        <CheckboxGroup
          options={optionsFirstCol}
          onChange={handleChange}
          name="features"
        />
        <CheckboxGroup
          options={optionsSecondCol}
          onChange={handleChange}
          name="features"
        />
      </div>
    </FormWrapper>
  );
}
