import VoteDescriptionCard from "./VoteDescriptionCard";
import AddProjectIdeaButton from "./AddProjectIdeaButton";
import FinalizeIdeationButton from "./FinalizeIdeationButton";

function CreateIdeationContainer() {
  return (
    <div className="bg-base-200 3xl:grid-cols-[200px_1fr_200px] 3xl:gap-x-[110px] grid w-full grid-cols-[185px_1fr] place-items-center gap-x-10 gap-y-7 rounded-2xl p-10 2xl:gap-x-20">
      <VoteDescriptionCard />
      <section className="3xl:row-auto row-span-2 w-full gap-y-7">
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
