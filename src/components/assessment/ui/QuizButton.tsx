import Button from "@/components/Button";

export default function QuizButton() {
  return (
    <div className="flex w-full items-center justify-center rounded-tl-[16px] pt-[40px]">
      <Button className="w-full bg-[#A3CEE9] py-[10px] text-black">
        Retake Quiz
      </Button>
    </div>
  );
}
