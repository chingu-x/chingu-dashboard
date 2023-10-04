import { XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

export default function Modal({ title, children }: ModalProps) {
  console.log("form server");
  return (
    <dialog className="modal bg-base-300/25" open={true}>
      <div className="modal-box bg-base-content flex flex-col text-base-300 md:min-w-[730px] overflow-y-hidden p-10">
        {/* HEADER */}
        <div className="flex items-center justify-between pb-10">
          <h3 className="text-xl font-semibold capitalize">{title}</h3>
          <Link href="/" aria-label="close modal">
            <XMarkIcon className="w-6 h-6 fill-current" />
          </Link>
        </div>
        {/* CONTENT */}
        <form className="flex flex-col overflow-hidden">{children}</form>
      </div>
    </dialog>
  );
}
