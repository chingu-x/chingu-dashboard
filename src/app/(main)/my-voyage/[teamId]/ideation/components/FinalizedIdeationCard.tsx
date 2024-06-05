import { CheckBadgeIcon } from "@heroicons/react/24/outline";

export default function FinalizedIdeationCard() {
  return (
    <div className="flex h-[320px] w-[200px] flex-col gap-y-4 rounded-lg bg-base-100 p-4">
      <CheckBadgeIcon className="h-6 w-6" />
      <h1 className="text-xl font-semibold text-base-300">Finalized Project</h1>
      <p className="text-base font-medium text-neutral-focus">
        Congrats on finalizing your project! Get ready to dive in and remember
        to check back here if you need a refresher on what your project idea is!
      </p>
      <p className="text-base font-medium text-neutral-focus">Good luck!</p>
    </div>
  );
}
