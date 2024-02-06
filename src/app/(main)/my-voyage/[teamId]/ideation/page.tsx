import { Suspense } from "react";
import CreateIdeationContainer from "./components/CreateIdeationContainer";
import IdeationComponentWrapper from "./components/IdeationComponentWrapper";
import Banner from "@/components/banner/Banner";
import Spinner from "@/components/Spinner";

export default function IdeationPage() {
  return (
    <>
      <Banner
        imageLight="/img/ideation_banner_light.png"
        imageDark="/img/ideation_banner_dark.png"
        alt="ideation_banner"
        title="Ideation"
        description="Okay, time to put on your thinking caps and channel your inner creativity! What kind of amazing, mind-blowing project idea do you have that will make SpaceX jealous? Let's hear it!"
      />
      <div className="flex flex-col items-center gap-y-10">
        <CreateIdeationContainer />
        <Suspense fallback={<Spinner />}>
          <IdeationComponentWrapper />
        </Suspense>
      </div>
    </>
  );
}
