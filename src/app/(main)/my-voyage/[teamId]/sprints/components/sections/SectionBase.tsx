"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, type Variants, motion } from "framer-motion";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import useServerAction from "@/hooks/useServerAction";
import { addSection, editMeeting } from "@/myVoyage/sprints/sprintsService";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { Forms } from "@/utils/form/formsEnums";

interface SectionBaseProps {
  params: {
    meetingId: string;
    sprintNumber: string;
  };
  id: number;
  title: string;
  icon: React.JSX.Element;
  isAdded: boolean;
  children: React.ReactNode;
  reorderSections?: (title: string) => void;
}

export default function SectionBase({
  params,
  id,
  title,
  icon,
  isAdded,
  children,
  reorderSections,
}: SectionBaseProps) {
  const [meetingId, sprintNumber] = [
    Number(params.meetingId),
    Number(params.sprintNumber),
  ];

  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // Planning & Retrospective&Review Sections Action
  const {
    runAction: addSectionAction,
    isLoading: addSectionLoading,
    setIsLoading: setAddSectionLoading,
  } = useServerAction(addSection);

  // Notes Section Action
  const {
    runAction: editMeetingAction,
    isLoading: editMeetingLoading,
    setIsLoading: setEditMeetingLoading,
  } = useServerAction(editMeeting);

  useEffect(() => {
    if (isAdded) setIsOpen(true);
  }, [isAdded]);

  const handleAddSection = async () => {
    if (id !== Number(Forms.notes)) {
      const [res, error] = await addSectionAction({
        sprintNumber,
        meetingId,
        formId: id,
      });
      if (res) {
        reorderSections && reorderSections(title);
      }

      if (error) {
        dispatch(
          onOpenModal({ type: "error", content: { message: error.message } }),
        );

        setAddSectionLoading(false);
      }
    } else {
      const notes = "";
      const [res, error] = await editMeetingAction({
        sprintNumber,
        meetingId,
        notes,
      });
      if (res) {
        reorderSections && reorderSections(title);
        setIsOpen(true);
      }

      if (error) {
        dispatch(
          onOpenModal({ type: "error", content: { message: error.message } }),
        );

        setEditMeetingLoading(false);
      }
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const panelVariants: Variants = {
    initial: {
      height: 0,
    },
    animate: {
      height: "auto",
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      height: 0,
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
        "rounded-2xl border border-base-100 bg-base-100 p-10",
        isAdded && "bg-base-200",
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-x-2 text-[25px] font-medium capitalize text-base-300 [&>*:first-child]:h-[30px] [&>*:first-child]:w-[30px]">
          {icon}
          {title}
        </h2>
        {!isAdded && (
          <button
            type="button"
            onClick={handleAddSection}
            aria-label="add section"
            disabled={addSectionLoading || editMeetingLoading}
          >
            <PlusCircleIcon className="h-10 w-10 text-base-300" />
          </button>
        )}
        <AnimatePresence mode="popLayout">
          {isAdded && isOpen && (
            <motion.button
              key={`open-${title}`}
              initial={{ rotateX: "0deg" }}
              animate={{ rotateX: "180deg" }}
              exit={{ rotateX: "0deg" }}
              transition={{ duration: 0.3 }}
              id={`accordion-header-${title}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${title}`}
              type="button"
              onClick={() => handleToggle()}
              aria-label={`close ${title} panel`}
            >
              <ChevronDownIcon className="h-10 w-10 text-base-300" />
            </motion.button>
          )}
          {isAdded && !isOpen && (
            <motion.button
              key={`close-${title}`}
              initial={{ rotateX: "0deg" }}
              animate={{ rotateX: "180deg" }}
              exit={{ rotateX: "0deg" }}
              transition={{ duration: 0.3 }}
              id={`accordion-header-${title}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${title}`}
              type="button"
              onClick={() => handleToggle()}
              aria-label={`open ${title} panel`}
            >
              <ChevronUpIcon className="h-10 w-10 text-base-300" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            key={`accordion-panel-${title}`}
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
            >
              {children}
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
