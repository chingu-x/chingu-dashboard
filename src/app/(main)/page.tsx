// replace with dashboard page when that's completed

import Image from 'next/image';
import Button from '@/components/Button';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function Home() {
  return (
    <div className="flex flex-row gap-x-6">
      <div className="flex flex-col gap-y-6 flex-grow-1">
        <div className="w-full h-[350] p-6 bg-base-200 rounded-2xl">
          <div>
            <p>Before your Voyage starts...</p>
            <p>
              Explore Chingu's Knowledge Hub to prepare for your Voyage with
              information on tools, Agile, Scrum, Git, Teamwork, and more.
            </p>
          </div>
          <div>
            <Button variant="neutral" className="w-full justify-between">
              🚀 Understand the Voyage Process
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
            <Button variant="neutral" className="w-full justify-between">
              📜 Review the Chingu Agile Methodology
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
            <Button variant="neutral" className="w-full justify-between">
              🤔 Start thinking about project ideas & the technical stack
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
            <Button variant="neutral" className="w-full justify-between">
              🙋 Do you have questions about Chingu or the Voyage process?
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="bg-base-200 rounded-2xl py-6 flex flex-col gap-y-4">
          <p className="text-center">
            Need support? Let’s get you back on track!
          </p>
          <Button className="self-center">Get Help</Button>
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
            style={{ objectFit: 'contain' }}
            priority={true}
          />
        </div>
        <div
          data-hide-on-theme="light"
          className="flex h-full w-full relative shrink-0"
        >
          <Image
            src="/img/pre_voyage_dark.png"
            alt="Light pre Voyage image"
            fill={true}
            style={{ objectFit: 'contain' }}
            priority={true}
          />
        </div>
        <p className="text-center">Are you ready?</p>
        <p className="text-center">Your Voyage starts on May 2, 2024.</p>
      </div>
    </div>
  );
}
