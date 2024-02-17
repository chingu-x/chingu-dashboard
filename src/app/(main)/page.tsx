// replace with dashboard page when that's completed

import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="flex flex-row gap-x-6">
      <div className="flex flex-col gap-y-6 flex-grow-1">
        <div className="w-full h-[350] p-6 bg-base-200 rounded-2xl">
          <div>
            <p className="text-[25px] font-semibold	">
              Before your Voyage starts...
            </p>
            <p className="font-medium	text-base">
              Explore Chingu's Knowledge Hub to prepare for your Voyage with
              information on tools, Agile, Scrum, Git, Teamwork, and more.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-y-6">
            <Link
              href="https://github.com/chingu-voyages/voyage-template/issues/11"
              target="_blank"
            >
              <Button
                variant="neutral"
                className="w-full justify-between bg-base-100 hover:shadow-md"
              >
                <p className="underline cursor-pointer">
                  🚀 Understand the Voyage Process
                </p>
                <ArrowRightIcon className="w-5 h-5" />
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
                <p className="underline cursor-pointer">
                  📜 Review the Chingu Agile Methodology
                </p>
                <ArrowRightIcon className="w-5 h-5" />
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
                <p className="underline cursor-pointer">
                  🤔 Start thinking about project ideas & the technical stack
                </p>
                <ArrowRightIcon className="w-5 h-5" />
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
                <p className="underline cursor-pointer">
                  🙋 Do you have questions about Chingu or the Voyage process?
                </p>
                <ArrowRightIcon className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="bg-base-200 rounded-2xl py-6 flex flex-col gap-y-4">
          <p className="text-center font-medium	text-base">
            Need support? Let’s get you back on track!
          </p>
          <Button className="self-center" variant="outline">
            Get Help
          </Button>
        </div>
      </div>
      <div className="bg-base-200 rounded-2xl flex flex-col flex-grow-1 w-full">
        <div
          data-hide-on-theme="dark"
          className="flex h-[437px] w-full relative shrink-0"
        >
          <Image
            src="/img/pre_voyage_light.png"
            alt="Light pre Voyage image"
            fill={true}
            style={{ objectFit: "contain" }}
            priority={true}
          />
        </div>
        <div
          data-hide-on-theme="light"
          className="flex h-[437px] w-full relative shrink-0"
        >
          <Image
            src="/img/pre_voyage_dark.png"
            alt="Light pre Voyage image"
            fill={true}
            style={{ objectFit: "contain" }}
            priority={true}
          />
        </div>
        <p className="text-center text-[25px] font-semibold">Are you ready?</p>
        <p className="text-center text-base font-medium	">
          Your Voyage starts on May 2, 2024.
        </p>
      </div>
    </div>
  );
}
