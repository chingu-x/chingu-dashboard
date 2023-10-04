"use client";

import Link from "next/link";
import { Button } from "@/components";

export default function Example4ModalClient() {
  return (
    <>
      {/* SCROLLABLE CONTENT */}
      <div className="flex flex-col pr-2 mr-1 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <textarea className="textarea" placeholder="Bio"></textarea>
          <input type="text" placeholder="Type here" className="w-full input" />
          <input type="text" placeholder="Type here" className="w-full input" />
          <input type="text" placeholder="Type here" className="w-full input" />
          <input type="text" placeholder="Type here" className="w-full input" />
          <textarea className="textarea" placeholder="Bio"></textarea>
          <textarea className="textarea" placeholder="Bio"></textarea>
          <textarea className="textarea" placeholder="Bio"></textarea>
          <textarea className="textarea" placeholder="Bio"></textarea>
        </div>
      </div>
      {/* BUTTONS */}
      <div className="flex flex-col gap-5 mt-10 ">
        <Button
          type="submit"
          title="Submit"
          customClassName="text-base gap-x-0 border-none font-semibold capitalize bg-primary text-base-300 hover:bg-primary-focus"
        >
          Submit
        </Button>
        <Link
          href="/"
          className="text-base font-semibold capitalize btn btn-neutral"
        >
          Go back
        </Link>
      </div>
    </>
  );
}
