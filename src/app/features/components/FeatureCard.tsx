"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Feature } from "./fixtures/Features";
import FeatureCardItem from "./FeatureCardItem";

import Button from "@/components/Button";

interface FeatureCardProps {
  title: string;
  features: Feature[];
  currentUser: {
    id: string;
    teamId: number;
  };
}

export default function FeatureCard({
  title,
  features,
  currentUser,
}: FeatureCardProps) {
  return (
    <div className="w-full p-10 font-semibold card bg-secondary-content rounded-2xl text-base-300">
      <div className="p-0 card-body gap-y-6">
        <h4 className="mb-4 text-xl capitalize card-title">{title}</h4>
        {/* Empty card */}
        {features.length === 0 && (
          <span className="text-neutral-focus bg-base-200 py-[14px] px-[22px] rounded-lg">
            Share your suggestions!
          </span>
        )}
        {/* Non-empty card */}
        {/* Features container / drag and drop area */}
        <ul className="flex flex-col gap-y-6">
          {features.map((feature) => (
            <FeatureCardItem
              key={feature.id}
              feature={feature}
              currentUserId={currentUser.id}
            />
          ))}
        </ul>
        <div className="card-actions">
          {/* Similiar to tech stack button, need to be a shared component */}
          <Button
            title={`add ${title}`}
            customClassName="capitalize w-full py-[14px] px-[22px] text-xs font-semibold text-base-300 bg-secondary border-transparent flex justify-start items-center hover:bg-secondary hover:border-transparent"
          >
            <PlusCircleIcon className="h-[18px] w-[18px] text-base-300" />
            Add Feature
          </Button>
        </div>
      </div>
    </div>
  );
}
