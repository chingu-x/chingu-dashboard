import { VoteDescriptionCard } from ".";
import { Button } from "@/components";

function CreateIdeationContainer() {
  return (
    <div className="card w-full h-[190px] bg-base-100 text-neutral-content flex flex-row items-center px-10">
      <VoteDescriptionCard />
      <section className="card-body gap-y-7 px-20">
        <h2 className="text-xl font-semibold text-neutral-focus">
          What is your Voyage project idea & vision?
        </h2>
        <p className="text-base font-medium text-neutral">
          We value your ideas! Share your ideas on what our project should be.
          Describe your vision to capture what it does and the benefit it will
          bring to users.
        </p>
      </section>
      <Button
        title="Create Project"
        customClassName="w-1/7 btn-primary text-base-content normal-case"
      >
        Create Project
      </Button>
    </div>
  );
}

export default CreateIdeationContainer;
