import CreateIdeationContainer from "./components/CreateIdeationContainer";
import IdeationClientComponentWrapper from "@/app/(main)/my-voyage/ideation/components/IdeationClientComponentWrapper";

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
      <div className="flex flex-col items-center">
        <CreateIdeationContainer />
        <IdeationClientComponentWrapper />
      </div>
    </>
  );
}

export default IdeationPage;
