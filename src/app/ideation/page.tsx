import { revalidatePath } from "next/cache";
import Preloader from "./components/Preloader";
import CreateIdeationContainer from "./components/CreateIdeationContainer";
import IdeationClientComponentWrapper from "./components/IdeationClientComponentWrapper";
import {
  IdeationData,
  fetchIdeations,
} from "@/store/features/ideation/ideationSlice";

import Banner from "@/components/banner/Banner";
import { store } from "@/store/store";

// const USERID = "e7a6262d-c596-44ac-9a50-373bcff1e155";
const TEAMID = 5;

async function IdeationPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/teams/${TEAMID}/ideations`,
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
