import Button from "@/components/Button";

export default function QuizButton() {
  return (
    <div className="flex min-h-[60px] w-[814px] items-center justify-center gap-[42px] rounded-tl-[16px] border border-gray-300 bg-opacity-70 pt-[40px]">
      <Button className="mt-[24px] bg-[#A3CEE9]">Retake Quiz</Button>
    </div>
  );
}
