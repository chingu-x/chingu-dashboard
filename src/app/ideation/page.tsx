import CreateIdeationContainer from "./components/CreateIdeationContainer";
import IdeationClientComponentWrapper from "./components/IdeationClientComponentWrapper";
import Banner from "@/components/banner/Banner";

// const USERID = "e7a6262d-c596-44ac-9a50-373bcff1e155";

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
      <IdeationClientComponentWrapper />
    </>
  );
}

export default IdeationPage;
