"use client";
import dynamic from "next/dynamic";
import confettiAnimation from "@/public/lotties/assessment_confetti.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function ConfettiScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <Lottie animationData={confettiAnimation} loop={false} />
    </div>
  );
}
