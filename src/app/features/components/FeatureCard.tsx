import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";

interface FeatureCardProps {
  title: string;
}

export default function FeatureCard({ title }: FeatureCardProps) {
  return (
    <div className="w-full p-10 font-semibold card bg-secondary-content rounded-2xl text-base-300">
      <div className="p-0 card-body gap-y-8">
        <h4 className="mb-4 text-xl capitalize card-title">{title}</h4>
        <span className="text-neutral-focus bg-base-200 py-[14px] px-[22px] rounded-lg">
          Share your suggestions!
        </span>
        <div className="card-actions">
          {/* Similiar to tech stack button, need to be a shared component */}
          <Button
            title={`add ${title}`}
            customClassName="capitalize w-full py-[14px] px-[22px] text-base font-semibold leading-4 text-base-300 bg-secondary border-transparent flex justify-start items-center hover:bg-secondary hover:border-transparent"
          >
            <PlusCircleIcon className="h-[18px] w-[18px] text-base-300" />
            Add Feature
          </Button>
        </div>
      </div>
    </div>
  );
}
