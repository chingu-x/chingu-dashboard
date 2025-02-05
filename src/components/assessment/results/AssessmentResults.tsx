import TierDisplay from "@/components/assessment/ui/TierDisplay";
import ButtonsController from "@/components/assessment/ui/ButtonsController";

export default function AssessmentResultsPage() {
  return (
    <div className="relative left-[581px] top-[354px] flex h-[480px] w-[814px] flex-col items-center justify-center gap-[42px] overflow-hidden bg-white text-black">
      <div className="flex w-full flex-col">
        <div className="text-center">
          After analyzing your results, <br />
          We&apos;ve concluded that you are a ... <br />
        </div>
        <TierDisplay />
        <ButtonsController />
      </div>
    </div>
  );
}
