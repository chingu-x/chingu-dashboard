import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import Button from "@/components/Button";

function PreVoyageLinks() {
  return (
    <div className="mt-6 flex flex-col gap-y-6">
      <Link
        href="https://github.com/chingu-voyages/voyage-template/issues/11"
        target="_blank"
      >
        <Button
          variant="neutral"
          className="w-full justify-between bg-base-100 hover:shadow-md"
        >
          <p className="cursor-pointer underline">
            🚀 Understand the Voyage Process
          </p>
          <ArrowRightIcon className="h-5 w-5" />
        </Button>
      </Link>
      <Link
        href="https://github.com/chingu-voyages/voyage-template/issues/2"
        target="_blank"
      >
        <Button
          variant="neutral"
          className="w-full justify-between bg-base-100 hover:shadow-md"
        >
          <p className="cursor-pointer underline">
            📜 Review the Chingu Agile Methodology
          </p>
          <ArrowRightIcon className="h-5 w-5" />
        </Button>
      </Link>
      <Link
        href="https://github.com/chingu-voyages/voyage-template/issues/3"
        target="_blank"
      >
        <Button
          variant="neutral"
          className="w-full justify-between bg-base-100 hover:shadow-md"
        >
          <p className="cursor-pointer underline">
            🤔 Start thinking about project ideas & the technical stack
          </p>
          <ArrowRightIcon className="h-5 w-5" />
        </Button>
      </Link>
      <Link
        href="https://github.com/chingu-voyages/voyage-template/issues/4"
        target="_blank"
      >
        <Button
          variant="neutral"
          className="w-full justify-between bg-base-100 hover:shadow-md"
        >
          <p className="cursor-pointer underline">
            🙋 Do you have questions about Chingu or the Voyage process?
          </p>
          <ArrowRightIcon className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}

export default PreVoyageLinks;
