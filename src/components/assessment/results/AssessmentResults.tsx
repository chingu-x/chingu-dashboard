import TierDisplay from "@/components/assessment/ui/TierDisplay";
import ButtonController from "@/components/assessment/ui/ButtonController";

export default function AssessmentResultsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white text-black">
      <TierDisplay />
      <ButtonController />
    </div>
  );
}
