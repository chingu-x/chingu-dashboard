import Button from "@/components/Button";
import QuizButton from "@/components/assessment/ui/QuizButton";
// import VoyagePageButton from "@/components/sidebar/VoyagePageButton";

export default function ButtonsController() {
  return (
    <div className="w-full max-w-[814px] space-y-4">
      <QuizButton />
      <div className="flex w-full items-center justify-center gap-[42px] rounded-tl-[16px] border border-gray-300 bg-opacity-70 pt-[40px]">
        <Button className="w-full bg-[#A3CEE9] py-[10px]">
          Back to Self Assessment Page
        </Button>
        <Button className="w-full bg-[#A3CEE9] py-[10px]">
          Join an Upcoming Voyage
        </Button>
      </div>
    </div>
  );
}
