"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import Header from "@/components/assessment/ui/Header";
import RadioGroupItem from "@/components/inputs/RadioGroup/RadioGroupItem";
import Button from "@/components/Button";

export default function AssessmentForm() {
  return (
    <div>
      <Header />
      <div
        aria-label="question-container"
        className="mb-[42px] mt-[286px] w-full max-w-[812px] gap-[24px] rounded-[16px] bg-[#F5F5F5] p-[40px]"
      >
        <p
          aria-label="question"
          className="mb-[32px] max-w-[650px] text-[25px] font-semibold leading-[30px] text-[#16171A]"
        >
          Do you have experience with HTML and CSS?
        </p>
        <div
          aria-label="radio-buttons"
          className="flex w-[650px] flex-col justify-center gap-[24px]"
        >
          <RadioGroupItem
            className="w-full gap-[16px] rounded-[8px] border border-[#9CA1AA] p-[16px] shadow-md shadow-[#4C515B0D]"
            id="none"
            label={
              <div>
                <strong>No Experience</strong>
              </div>
            }
          />
          <RadioGroupItem
            className="w-full gap-[16px] rounded-[8px] border border-[#9CA1AA] p-[16px] shadow-md shadow-[#4C515B0D]"
            id="beginner"
            label={
              <div>
                <strong>Beginner</strong>
                <p> I know what they are and have used them a bit</p>
              </div>
            }
          />
          <RadioGroupItem
            className="w-full gap-[16px] rounded-[8px] border border-[#9CA1AA] p-[16px] shadow-md shadow-[#4C515B0D]"
            id="intermediate"
            label={
              <div>
                <strong>Intermediate</strong>
                <p> I can build projects with HTML and CSS</p>
              </div>
            }
          />
          <RadioGroupItem
            className="w-full gap-[16px] rounded-[8px] border border-[#9CA1AA] p-[16px] shadow-md shadow-[#4C515B0D]"
            id="advanced"
            label={
              <div>
                <strong>Advanced</strong>
                <p>
                  I can build responsive, accessible interfaces and have a good
                  undestanding of modern layout techniques (Flexbox,Grid)
                </p>
              </div>
            }
          />
        </div>
      </div>

      <div className="w-max[812px] flex w-full items-center justify-center gap-[40px]">
        <Button className="h-[60px] w-[386px] w-full rounded-[8px] border border-[#9CA1AA] !bg-[#F5F5F5]/70 px-[26px] py-[18px] text-black">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button className="h-[60px] w-[386px] w-full rounded-[8px] border border-[#9CA1AA] !bg-[#217A56] px-[26px] py-[18px] text-white">
          Continue
          <ArrowRightIcon className="ml-2 h-4 w-4 text-white" />
        </Button>
      </div>
    </div>
  );
}
