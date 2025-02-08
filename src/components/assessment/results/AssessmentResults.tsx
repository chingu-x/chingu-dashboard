import TierDisplay from "@/components/assessment/ui/TierDisplay";
import ButtonsController from "@/components/assessment/ui/ButtonsController";
import ConfettiScreen from "@/components/assessment/ui/ConfettiScreen";
import ResultsLoading from "@/components/assessment/ui/ResultsLoading";

export default function AssessmentResultsPage() {
  return (
    <div className="w-screen">
      <ConfettiScreen />
      {/* <div className="absolute flex flex-col items-center justify-center"> */}
      <div className="text-center">
        After analyzing your results, <br />
        We&apos;ve concluded that you are a ... <br />
      </div>
      <TierDisplay />
      <ButtonsController />
      <ResultsLoading />
    </div>
  );
}
