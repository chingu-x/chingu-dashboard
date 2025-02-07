import React, { useState } from "react";
import RadioGroupItem from "@/components/inputs/RadioGroup/RadioGroupItem";

interface Option {
  id: string;
  value: string;
  label: string;
}

const options: Option[] = [
  { id: "devto", value: "devto", label: "dev.to" },
  { id: "freecodecamp", value: "freecodecamp", label: "FreeCodeCamp Forum" },
  { id: "medium", value: "medium", label: "Medium" },
  { id: "linkedin", value: "linkedin", label: "LinkedIn" },
  { id: "twitter", value: "twitter", label: "X (Formerly Twitter)" },
  { id: "other", value: "other", label: "Other" },
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

  const handleChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-base-300">
        How did you hear about us?
      </h2>
      <div className="h-[19px]"></div>
      <p className="h-8 w-full text-right text-[10px] font-medium text-neutral">
        (optional)
      </p>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <div
            className="w-[317px] cursor-pointer rounded-lg border border-neutral-content p-4"
            key={option.id}
            onClick={() => handleChange(option.value)}
          >
            <RadioGroupItem
              id={option.id}
              label={option.label}
              checked={selectedOption === option.value}
              onChange={() => handleChange(option.value)}
              name="how_did_you_hear"
              className="text-sm font-semibold text-base-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
