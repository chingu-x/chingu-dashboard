"use client";
import dynamic from "next/dynamic";
import confettiAnimation from "@/public/lotties/assessment_confetti.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
interface ConfettiScreenProps {
  className: string;
}

export default function ConfettiScreen({ className }: ConfettiScreenProps) {
  return (
    <div
      className={`flex h-screen w-screen items-center justify-center bg-white ${className}`}
    >
      <Lottie animationData={confettiAnimation} loop={false} />
    </div>
  );
}
