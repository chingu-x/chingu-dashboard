import { VoteDescriptionCard } from ".";
import { Button } from "@/components";

function CreateIdeationContainer() {
  return (
    <div className="card w-full min-h-[300px] bg-base-100 flex flex-row items-center px-10">
      <div className="flex flex-col justify-between h-full py-10 min-[1920px]:hidden">
        <VoteDescriptionCard />
        <Button
          title="Create Project"
          customClassName="w-1/7 btn-primary text-base-300 normal-case"
        >
          Create Project
        </Button>
      </div>
      <VoteDescriptionCard className="hidden min-[1920px]:block" />
      <section className="card-body gap-y-7 px-20">
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
        title="Create Project"
        customClassName="max-w-[200px] w-full btn-primary text-base-300 normal-case hidden min-[1920px]:block"
      >
        Create Project
      </Button>
    </div>
  );
}

export default CreateIdeationContainer;
