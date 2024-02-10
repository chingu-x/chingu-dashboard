"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import VoteDescriptionCard from "./VoteDescriptionCard";
import Button from "@/components/Button";
// import { useAppDispatch } from "@/store/hooks";
// import { onOpen } from "@/store/features/modal/modalSlice";

function CreateIdeationContainer() {
  // const dispatch = useAppDispatch();
  const { teamId } = useParams<{ teamId: string }>();

  return (
    <div className="grid grid-cols-[180px_1fr] 3xl:grid-cols-[200px_1fr_200px] items-center justify-items-center gap-y-7 3xl:gap-x-[110px] 2xl:gap-x-20 gap-x-10 w-full p-10 bg-base-100 rounded-2xl">
      <VoteDescriptionCard />
      <section className="w-full row-span-2 gap-y-7 3xl:row-auto">
        <h2 className="text-xl font-semibold text-base-300">
          What is your Voyage project idea & vision?
        </h2>
        <p className="text-base font-medium text-neutral-focus">
          We value your ideas! Share your ideas on what our project should be.
          Describe your vision to capture what it does and the benefit it will
          bring to users.
        </p>
      </section>
      <Link href={`/my-voyage/${teamId}/ideation/new`} className="w-full">
        <Button size="lg" className="w-full">
          Create Project
        </Button>
      </Link>
    </div>
  );
}

export default CreateIdeationContainer;
