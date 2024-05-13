import VoteDescriptionCard from "./VoteDescriptionCard";
import AddProjectIdeaButton from "./AddProjectIdeaButton";
import FinalizeIdeationButton from "./FinalizeIdeationButton";

function CreateIdeationContainer() {
  return (
    <div className="grid grid-cols-[185px_1fr] 3xl:grid-cols-[200px_1fr_200px] items-center justify-items-center gap-y-7 3xl:gap-x-[110px] 2xl:gap-x-20 gap-x-10 w-full p-10 bg-base-200 rounded-2xl">
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
      <div className="flex flex-col gap-y-4">
        <AddProjectIdeaButton />
        <FinalizeIdeationButton />
      </div>
    </div>
  );
}

export default CreateIdeationContainer;
