import { CreateIdeationContainer, IdeationContainer, ideation } from ".";
import { Banner } from "@/components";

function IdeationPage() {
  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col gap-y-9 p-3">
        <Banner
          image="/img/ideation_banner.png"
          alt="ideation_banner"
          title="Ideation"
          description="Okay, time to put on your thinking caps and channel your inner creativity! What kind of amazing, mind-blowing project idea do you have that will make SpaceX jealous? Let's hear it!"
        />
        <CreateIdeationContainer />
        {ideation.map((i) => (
          <IdeationContainer
            key={i.id}
            title={i.title}
            project_idea={i.project_idea}
            vision_statement={i.vision_statement}
            users={i.users}
            voted={i.voted}
            own_idea={i.own_idea}
            contributed_by={i.contributed_by}
          />
        ))}
      </div>
    </div>
  );
}

export default IdeationPage;
