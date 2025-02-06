import Header from "@/components/assessment/ui/Header";
import RadioGroupItem from "@/components/inputs/RadioGroup/RadioGroupItem";
import Button from "@/components/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

export default function AssessmentForm() {
  return (
    <>
      <Header />
      <div className="absolute left-[583px] top-[318px] h-[580px] w-[812px] gap-[42px] p-20">
        <p className="mb-4">Do you have experience with HTML and CSS?</p>
        <div className="flex flex-col justify-center gap-4">
          <RadioGroupItem
            className="h-[68px] w-full min-w-[300px] gap-4 rounded-tl-md border-b border-l border-r border-t border-gray-400 px-16 pb-16 pt-16"
            id="none"
            label={
              <div>
                <strong>No Experience</strong>
              </div>
            }
          />
          <RadioGroupItem
            className="h-[68px] w-full min-w-[300px] gap-4 rounded-tl-md border-b border-l border-r border-t border-gray-400 px-16 pb-16 pt-16"
            id="beginner"
            label={
              <div>
                <strong>Beginner</strong>
                <p> I know what they are and have used them a bit</p>
              </div>
            }
          />
          <RadioGroupItem
            className="h-[68px] w-full min-w-[300px] gap-4 rounded-tl-md border-b border-l border-r border-t border-gray-400 px-16 pb-16 pt-16"
            id="intermediate"
            label={
              <div>
                <strong>Intermediate</strong>
                <p> I can build projects with HTML and CSS</p>
              </div>
            }
          />
          <RadioGroupItem
            className="h-[68px] w-full min-w-[300px] gap-4 rounded-tl-md border-b border-l border-r border-t border-gray-400 px-16 pb-16 pt-16"
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
        <div className="flex w-full items-center justify-center gap-[42px] rounded-tl-[16px] border border-gray-300 bg-opacity-70 pt-[40px]">
          <Button className="w-full !bg-[#F5F5F5] py-[10px] text-black">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button className="w-full !bg-[#217A56] py-[10px]">
            Continue
            <ArrowRightIcon className="ml-2 h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
    </>
  );
}
