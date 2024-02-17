"use client";

import { useCallback } from "react";

import Link from "next/link";
import Modal from "@/components/modals/Modal";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { onClose } from "@/store/features/modal/modalSlice";

export default function GettingHelpModal() {
  const { isOpen, type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "gettingHelp";

  const handleClose = useCallback(() => {
    dispatch(onClose());
  }, [dispatch]);

  return (
    <Modal isOpen={isModalOpen} title="Getting Help" onClose={handleClose}>
      <div className="flex flex-col">
        <p>Roundtable Discussion</p>
        <p>
          If you have questions about Chingu or the Voyage process join one or
          both of the Chingu Roundtable sessions held every:
        </p>
        <ul className="list-disc ml-6">
          <li>Wednesday @ 5:00 PM CT (Chicago) </li>
          <li>Saturday @ 9:00 AM CT (Chicago)</li>
        </ul>
        <p>
          These sessions give you the opportunity to ask your questions in real
          time with a member of the Chingu team. These are held in our Discord
          community in the <span className="font-bold">#townhall-chat</span> &{" "}
          <span className="font-bold">#townhall-voice</span> channels.
        </p>
        <p>Stuck on a coding issue?</p>
        <p>
          Chingu&apos;s are famous for helping each other with technical
          problems and you can tap into this generosity by posting your
          technical questions and issues in the{" "}
          <span className="font-bold">#coding-help</span> Discord channel.
        </p>
        <p>Reaching out to Chingu Admin</p>
        <p>
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
        <p>
          If you need to ask something confidential you can email
          support@chingu.io
        </p>
      </div>
    </Modal>
  );
}
