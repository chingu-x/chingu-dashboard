import React, { useState } from "react";
import CheckboxGroup from "@/components/inputs/CheckBoxGroup/CheckboxGroupVertical";

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
    title: "Data Analytics",
    description: "Real-time insights and reporting dashboard",
  },
  {
    id: "3",
    title: "Custom Integration",
    description: "Connect with your favorite tools seamlessly",
  },
  {
    id: "4",
    title: "Team Collaboration",
    description: "Work together efficiently with your team",
  },
];

const optionsDataSecondCol: Option[] = [
  {
    id: "5",
    title: "Solidarity",
    description: "Being in a group of friendly coders who share my goals",
  },
  {
    id: "6",
    title: "Data Analytics",
    description: "Real-time insights and reporting dashboard",
  },
  {
    id: "7",
    title: "Custom Integration",
    description: "Connect with your favorite tools seamlessly",
  },
  {
    id: "8",
    title: "Team Collaboration",
    description: "Work together efficiently with your team",
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
    <div className="py-10">
      <h2 className="text-2xl font-semibold text-base-300">
        What features are you most excited about?
      </h2>
      <p className="mb-6 text-sm font-medium leading-4 text-base-300">
        (Maximum 3)
      </p>
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
    </div>
  );
}
