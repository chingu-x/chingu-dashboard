"use client";

import { useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
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

  const panelVariants: Variants = {
    initial: {
      height: "0",
    },
    animate: {
      height: "auto",
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      height: "0",
      transition: {
        duration: 0.4,
        delay: 0.3,
      },
    },
  };

  const innerContentVariants: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.4,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
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
        <AnimatePresence mode="popLayout">
          {isAdded && isOpen && (
            <motion.button
              key="up"
              initial={{ rotateX: "0deg" }}
              animate={{ rotateX: "180deg" }}
              exit={{ rotateX: "0deg" }}
              transition={{ duration: 0.3 }}
              id={`accordion-header-${title}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${title}`}
              type="button"
              onClick={handleToggle}
              aria-label="close"
            >
              <ChevronUpIcon className="w-10 h-10 text-base-300" />
            </motion.button>
          )}
          {isAdded && !isOpen && (
            <motion.button
              key="down"
              initial={{ rotateX: "0deg" }}
              animate={{ rotateX: "180deg" }}
              exit={{ rotateX: "0deg" }}
              transition={{ duration: 0.3 }}
              type="button"
              onClick={handleToggle}
              aria-label="open"
            >
              <ChevronDownIcon className="w-10 h-10 text-base-300" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            key="panel"
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            id={`accordion-panel-${title}`}
            aria-labelledby={`accordion-header-${title}`}
          >
            <motion.div
              key="innerContent"
              variants={innerContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-10"
            >
              {children}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
