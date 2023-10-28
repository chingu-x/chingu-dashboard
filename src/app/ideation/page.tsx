import Preloader from "./components/Preloader";
import CreateIdeationContainer from "./components/CreateIdeationContainer";
import IdeationClientComponentWrapper from "./components/IdeationClientComponentWrapper";
import {
  IdeationData,
  fetchIdeations,
} from "@/store/features/ideation/ideationSlice";

import Banner from "@/components/banner/Banner";
import { store } from "@/store/store";

// const USERID = "be650b1e-078a-4ebd-ad07-6a368d5f250a";
const TEAMID = 3;

async function IdeationPage() {
  const res = await fetch(
    `https://chingu-dashboard-be-development.up.railway.app/api/v1/teams/${TEAMID}/ideations`,
  );
  const data = (await res.json()) as IdeationData[];

  store.dispatch(fetchIdeations(data));

  return (
    <>
      <Preloader data={data} />
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
