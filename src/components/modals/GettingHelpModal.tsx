"use client";

import { useCallback } from "react";

import Link from "next/link";
import Modal from "@/components/modals/Modal";

import { onCloseModal } from "@/store/features/modal/modalSlice";
import { useAppDispatch, useModal } from "@/store/hooks";

export default function GettingHelpModal() {
  const { isOpen } = useModal();
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(onCloseModal());
  }, [dispatch]);

  return (
    <Modal isOpen={isOpen} title="Getting Help" onClose={handleClose}>
      <div className="flex max-w-[700px] flex-col">
        <p className="mb-2.5 text-base font-semibold">Roundtable Discussion</p>
        <p className="text-base">
          If you have questions about Chingu or the Voyage process join one or
          both of the Chingu Roundtable sessions held every:
        </p>
        <ul className="mb-4 ml-6 list-disc">
          <li>Wednesday @ 5:00 PM CT (Chicago) </li>
          <li>Saturday @ 9:00 AM CT (Chicago)</li>
        </ul>
        <p className="mb-10 text-base">
          These sessions give you the opportunity to ask your questions in real
          time with a member of the Chingu team. These are held in our Discord
          community in the <span className="font-bold">#townhall-chat</span> &{" "}
          <span className="font-bold">#townhall-voice</span> channels.
        </p>
        <p className="mb-2.5 text-base font-semibold">
          Stuck on a coding issue?
        </p>
        <p className="mb-10 text-base">
          Chingu&apos;s are famous for helping each other with technical
          problems and you can tap into this generosity by posting your
          technical questions and issues in the{" "}
          <span className="font-bold">#coding-help</span> Discord channel.
        </p>
        <p className="mb-2.5 text-base font-semibold">
          Reaching out to Chingu Admin
        </p>
        <p className="mb-2.5 text-base">
          If you need assistance from our Admin Team, you can ask questions
          anytime in the <span className="font-bold">#admin-feedback</span>{" "}
          channel or you can open up a support ticket by clicking on the{" "}
          <span className="font-bold">#open-support-ticket</span> channel in
          Discord. Make sure that you follow the guidelines on{" "}
          <Link
            href="https://discord.com/channels/@me/1161026034611793920/1197239613836754996"
            target="_blank"
            className="underline"
          >
            How to Ask a Good Question
          </Link>{" "}
          to help us understand and quickly resolve your question.
        </p>
        <p className="text-base">
          If you need to ask something confidential you can email
          <Link href="mailto:support@chingu.io">support@chingu.io</Link>
        </p>
      </div>
    </Modal>
  );
}
