import { CheckBadgeIcon } from "@heroicons/react/24/outline";

export default function FinalizedIdeationCard() {
  return (
    <div className="flex flex-col w-[200px] h-[320px] gap-y-4 p-4 rounded-lg bg-base-100">
      <CheckBadgeIcon className="w-6 h-6" />
      <h1 className="text-base-300 font-semibold text-xl">Finalized Project</h1>
      <p className="text-neutral-focus font-medium text-base">
        Congrats on finalizing your project! Get ready to dive in and remember
        to check back here if you need a refresher on what your project idea is!
      </p>
      <p className="text-neutral-focus font-medium text-base">Good luck!</p>
    </div>
  );
}
