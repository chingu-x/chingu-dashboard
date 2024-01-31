import { Suspense } from "react";
import CreateIdeationContainer from "./components/CreateIdeationContainer";
import IdeationComponentWrapper from "./components/IdeationComponentWrapper";
// import IdeationClientComponentWrapper from "@/app/(main)/my-voyage/ideation/components/IdeationClientComponentWrapper";

import Banner from "@/components/banner/Banner";
import Spinner from "@/components/Spinner";
// import { getUser } from "@/app/(auth)/authService";

// const USERID = "e7a6262d-c596-44ac-9a50-373bcff1e155";

export default function IdeationPage() {
  // const user = await getUser();

  // const currentVoyageTeam = user.voyageTeamMembers.find(
  //   (voyage) => voyage.voyageTeam.voyage.status.name === "Active"
  // );

  // console.log("page 1", user);

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
