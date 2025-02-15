import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Button from "@/components/Button";
import QuizButton from "@/components/assessment/ui/QuizButton";
// import VoyagePageButton from "@/components/sidebar/VoyagePageButton";

export default function ButtonsController() {
  return (
    <div className="h-[150px] w-full max-w-[814px] gap-[30px]">
      <Link href="/assessment/form">
        <QuizButton />
      </Link>
      <div className="flex w-full items-center justify-center gap-[42px] rounded-tl-[16px] pt-[40px]">
        <Link href="/assessment/home">
          <Button className="w-full gap-[8px] border-[#217A56] !bg-[#F5F5F5] px-[26px] py-[18px] text-[20px] font-semibold text-black">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Self Assessment Page
          </Button>
        </Link>
        <Link href="/prevoyage">
          <Button className="w-full gap-[8px] !bg-[#217A56] px-[26px] py-[18px] text-[20px] font-semibold">
            Join an Upcoming Voyage
            <ArrowRightIcon className="ml-2 h-4 w-4 text-white" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
