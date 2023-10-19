import CreateIdeationContainer from "./components/CreateIdeationContainer";
import IdeationContainer from "./components/IdeationContainer";
import { ideation } from "./components/fixtures/ideation";
import Banner from "@/components/banner/Banner";

function IdeationPage() {
  return (
    <>
      <Banner
        imageLight="/img/ideation_banner_light.png"
        imageDark="/img/ideation_banner_dark.png"
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
    </>
  );
}

export default IdeationPage;
