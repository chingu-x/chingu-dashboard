import { CreateIdeationContainer, IdeationContainer } from "./components";

function IdeationPage() {
  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col gap-y-9">
        <CreateIdeationContainer />
        <IdeationContainer />
      </div>
    </div>
  );
}

export default IdeationPage;
