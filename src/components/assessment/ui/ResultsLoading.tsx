import Image from "next/image";

export default function ResultsLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Image
        src="/img/assessment/analyzing_results.png"
        alt="Analyzing Results"
        className="animate-bounce-custom"
      />
      ;
    </div>
  );
}
