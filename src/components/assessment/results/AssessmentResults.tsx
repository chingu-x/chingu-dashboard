"use client";
import { useEffect, useState } from "react";
import TierDisplay from "@/components/assessment/ui/TierDisplay";
import ButtonsController from "@/components/assessment/ui/ButtonsController";
import ConfettiScreen from "@/components/assessment/ui/ConfettiScreen";
import ResultsLoading from "@/components/assessment/ui/ResultsLoading";

export default function AssessmentResultsPage() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute left-[581px] top-[354px] flex h-[480px] w-[814px] flex-col items-center justify-center gap-[42px]">
      {showLoading ? (
        <ResultsLoading />
      ) : (
        <>
          <ConfettiScreen className="absolute inset-0" />
          <div className="flex h-[90px] w-[650px] max-w-[650px] items-center justify-center text-center text-[25px] font-semibold leading-[30px] tracking-[0%] text-[#16171A]">
            After analyzing your results, <br />
            We&apos;ve concluded that you are a ... <br />
          </div>
          <TierDisplay />
          <ButtonsController />
        </>
      )}
    </div>
  );
}
