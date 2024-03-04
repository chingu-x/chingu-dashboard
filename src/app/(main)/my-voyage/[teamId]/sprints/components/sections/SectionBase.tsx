"use client";

import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface SectionBaseProps {
  title: string;
  icon: React.JSX.Element;
  isAdded: boolean;
  setIsAdded: (_: boolean) => void;
  children: React.ReactNode;
}

export default function SectionBase({
  title,
  icon,
  isAdded,
  setIsAdded,
  children,
}: SectionBaseProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOpen = () => {
    setIsAdded(true);
    setIsOpen(true);
  };

  return (
    <div
      className={cn(
        "p-10 rounded-2xl bg-base-100 border border-base-100",
        isAdded && "bg-base-200",
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-x-2 text-base-300 text-[25px] font-medium">
          {icon}
          {title}
        </h2>
        {!isAdded && (
          <button type="button" onClick={handleOpen} aria-label="add section">
            <PlusCircleIcon className="w-10 h-10 text-base-300" />
          </button>
        )}
        {isAdded && isOpen && (
          <button
            id={`accordion-header-${title}`}
            aria-expanded={isOpen}
            aria-controls={`accordion-panel-${title}`}
            type="button"
            onClick={handleToggle}
            aria-label="close"
          >
            <ChevronUpIcon className="w-10 h-10 text-base-300" />
          </button>
        )}{" "}
        {isAdded && !isOpen && (
          <button type="button" onClick={handleToggle} aria-label="open">
            <ChevronDownIcon className="w-10 h-10 text-base-300" />
          </button>
        )}
      </div>
      {isOpen && (
        <section
          id={`accordion-panel-${title}`}
          aria-labelledby={`accordion-header-${title}`}
          className="mt-10"
        >
          {children}
        </section>
      )}
    </div>
  );
}
