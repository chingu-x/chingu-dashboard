"use client";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import Header from "@/app/(main)/assessment/ui/Header";
import RadioGroupItem from "@/components/inputs/RadioGroup/RadioGroupItem";
import Button from "@/components/Button";
import { quiz } from "@/app/(main)/assessment/QuizData";

export default function AssessmentForm() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNext = () => {
    if (!selectedOption) {
      setErrorMessage("Select an option before moving onto the next question");
      return;
    }
    setErrorMessage("");
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentQuestion = quiz[currentIndex];

  return (
    <div>
      <Header />
      <div
        aria-label="question-container"
        className="mb-[42px] mt-[80px] w-full max-w-[812px] gap-[24px] rounded-[16px] bg-[#F5F5F5] p-[40px]"
      >
        <p
          aria-label="question"
          className="mb-[32px] max-w-[650px] text-[25px] font-semibold leading-[30px] text-[#16171A]"
        >
          {currentQuestion.question}
        </p>

        <div
          aria-label="radio-buttons"
          className="flex w-[650px] flex-col justify-center gap-[24px]"
        >
          {["none", "beginner", "intermediate", "advanced"].map((level) => (
            <RadioGroupItem
              key={level}
              className={`w-full gap-[16px] rounded-[8px] border p-[16px] shadow-md ${
                selectedOption === level
                  ? "border-[#217A56]"
                  : "border-[#9CA1AA]"
              }`}
              id={level}
              label={
                <div>
                  <strong>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </strong>
                  <p>
                    {currentQuestion[level as keyof typeof currentQuestion]}
                  </p>
                </div>
              }
              checked={selectedOption === level}
              onChange={() => setSelectedOption(level)}
            />
          ))}
        </div>

        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
      </div>

      <div className="flex w-[386px] items-center justify-center gap-[40px]">
        <Button
          className="h-[60px] w-full rounded-[8px] border border-[#9CA1AA] !bg-[#F5F5F5]/70 px-[26px] py-[18px] text-black"
          disabled={currentIndex === 0}
          onClick={handlePrev}
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          className="h-[60px] w-full rounded-[8px] border border-[#9CA1AA] !bg-[#217A56] px-[26px] py-[18px] text-white"
          disabled={currentIndex === quiz.length - 1}
          onClick={handleNext}
        >
          Continue
          <ArrowRightIcon className="ml-2 h-4 w-4 text-white" />
        </Button>
      </div>
    </div>
  );
}
