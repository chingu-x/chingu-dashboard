import React, { useState } from "react";
import RadioGroupVertical from "@/components/inputs/RadioGroup/RadioGroupVertical";

interface Option {
  id: string;
  value: string;
  label: string;
}

const optionsFirstCol: Option[] = [
  { id: "devto", value: "devto", label: "dev.to" },
  { id: "freecodecamp", value: "freecodecamp", label: "FreeCodeCamp Forum" },
  { id: "medium", value: "medium", label: "Medium" },
  { id: "linkedin", value: "linkedin", label: "LinkedIn" },
  { id: "twitter", value: "twitter", label: "X (Formerly Twitter)" },
  { id: "other", value: "other", label: "Other" },
];

const optionsSecondCol: Option[] = [
  { id: "job_hackers", value: "job_hackers", label: "The Job Hackers" },
  { id: "google_search", value: "google_search", label: "Google Search" },
  {
    id: "personal_network",
    value: "personal_network",
    label: "Personal Network",
  },
  { id: "scrimba", value: "scrimba", label: "Scrimba" },
  { id: "youtube", value: "youtube", label: "Youtube" },
];

export default function HowDidYouHear() {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="py-10">
      <h2 className="text-2xl font-semibold text-base-300">
        How did you hear about us?
      </h2>
      <p className="w-full text-right text-[10px] font-medium text-neutral">
        (optional)
      </p>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-10">
        <RadioGroupVertical
          options={optionsFirstCol.map((option) => ({
            ...option,
            checked: selectedOption === option.value,
            onChange: handleChange,
          }))}
          name="how_did_you_hear"
          className="font-semibold text-base-300"
        />
        <RadioGroupVertical
          options={optionsSecondCol.map((option) => ({
            ...option,
            checked: selectedOption === option.value,
            onChange: handleChange,
          }))}
          name="how_did_you_hear"
          className="font-semibold text-base-300"
        />
      </div>
    </div>
  );
}
