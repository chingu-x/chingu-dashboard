import Button from "@/components/Button";
import QuizButton from "@/components/assessment/ui/QuizButton";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
// import VoyagePageButton from "@/components/sidebar/VoyagePageButton";

export default function ButtonsController() {
  return (
    <div className="w-full max-w-[814px] space-y-4">
      <QuizButton />
      <div className="flex w-full items-center justify-center gap-[42px] rounded-tl-[16px] bg-opacity-70 pt-[40px]">
        <Button className="w-full !bg-[#F5F5F5] py-[10px] text-black">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Self Assessment Page
        </Button>
        <Button className="w-full !bg-[#217A56] py-[10px]">
          Join an Upcoming Voyage
          <ArrowRightIcon className="ml-2 h-4 w-4 text-white" />
        </Button>
      </div>
    </div>
  );
}
