import Link from "next/link";
import Modal from "./Modal";

export default function Example3Modal() {
  return (
    <Modal title="check in submission is received">
      {/* SCROLLABLE CONTENT */}
      <div className="flex flex-col pr-2 mr-1 overflow-y-auto">
        <p>Thanks for checking in this week!</p>
      </div>
      {/* BUTTONS */}
      <div className="flex flex-col gap-5 mt-10 ">
        <Link
          href="/"
          className="text-base font-semibold capitalize btn btn-neutral"
        >
          Go back
        </Link>
      </div>
    </Modal>
  );
}
