import QuizButton from "@/components/assessment/ui/QuizButton";

export default function TierDisplay() {
  return (
    <div className="flex min-h-[480px] w-[814px] items-center justify-center gap-[42px] rounded-tl-[16px] border border-gray-300 bg-opacity-70 pt-[40px]">
      <div className="text-center">
        After analyzing your results, <br />
        We've concluded that you are a ... <br />
        <div className="mt-[24px] bg-[#C4DED2]">Tier Level</div>
        <QuizButton />
      </div>
      ß
    </div>
  );
}
