import VoteDescriptionCard from "./VoteDescriptionCard";
import Button from "@/components/Button";
// import { useAppDispatch } from "@/store/hooks";
// import { onOpen } from "@/store/features/modal/modalSlice";

function CreateIdeationContainer() {
  // const dispatch = useAppDispatch();

  return (
    <div className="card w-[1050px] 3xl:w-full min-h-[190px] max-[1919px]:min-h-[280px] bg-base-100 flex flex-row items-center px-10 rounded-2xl">
      <div className="flex flex-col justify-between h-full py-10 min-[1920px]:hidden">
        <VoteDescriptionCard />
        <Button size="lg" className="max-[1920px]:w-[160px]">
          Create Project
        </Button>
      </div>
      <VoteDescriptionCard className="hidden min-[1920px]:block" />
      <section className="px-20 card-body gap-y-7">
        <h2 className="text-xl font-semibold text-base-300">
          What is your Voyage project idea & vision?
        </h2>
        <p className="text-base font-medium text-neutral-focus">
          We value your ideas! Share your ideas on what our project should be.
          Describe your vision to capture what it does and the benefit it will
          bring to users.
        </p>
      </section>
      <Button
        size="lg"
        className="max-w-[200px] w-full hidden min-[1920px]:block"
      >
        Create Project
      </Button>
    </div>
  );
}

export default CreateIdeationContainer;
