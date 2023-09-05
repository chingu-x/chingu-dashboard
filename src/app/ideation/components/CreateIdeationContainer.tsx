import { VoteDescriptionCard } from ".";

function CreateIdeationContainer() {
  return (
    <div className="card w-[1280px] h-[190px] bg-base-100 text-neutral-content flex flex-row items-center px-10">
      <VoteDescriptionCard />
      <div className="card-body gap-y-7 px-20">
        <h2 className="text-xl font-semibold text-neutral-focus">
          What is your Voyage project idea & vision?
        </h2>
        <p className="text-base font-medium text-neutral">
          We value your ideas! Share your ideas on what our project should be.
          Describe your vision to capture what it does and the benefit it will
          bring to users.
        </p>
      </div>
      <button className="btn btn-primary text-base-content w-1/7" type="button">
        Create Project
      </button>
    </div>
  );
}

export default CreateIdeationContainer;
