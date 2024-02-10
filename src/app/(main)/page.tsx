// replace with dashboard page when that's completed

import Button from '@/components/Button';
import Banner from '@/components/banner/Banner';

export default function Home() {
  return (
    <>
      <div className="flex flex-col w-[400px] gap-y-6">
        <div className="w-full h-[350] p-6 bg-base-200 rounded-2xl">
          <p>Before your Voyage starts...</p>
          <p>
            Explore Chingu's Knowledge Hub to prepare for your Voyage with
            information on tools, Agile, Scrum, Git, Teamwork, and more.
          </p>
        </div>
        <div className="bg-base-200 rounded-2xl py-6 flex flex-col gap-y-4">
          <p className="text-center">
            Need support? Let’s get you back on track!
          </p>
          <Button className="self-center">Get Help</Button>
        </div>
      </div>
      <div className="bg-base-200 rounded-2xl flex flex-col"></div>
    </>
  );
}
