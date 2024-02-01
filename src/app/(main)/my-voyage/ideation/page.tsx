import { Suspense } from "react";
import { redirect } from "next/navigation";
import CreateIdeationContainer from "./components/CreateIdeationContainer";
import IdeationComponentWrapper from "./components/IdeationComponentWrapper";
import { fetchProjectIdeas } from "./ideationService";
import Preloader from "./components/Preloader";
import Banner from "@/components/banner/Banner";
import Spinner from "@/components/Spinner";
import { getUser } from "@/app/(auth)/authService";
import { IdeationData } from "@/store/features/ideation/ideationSlice";

export default async function IdeationPage() {
  let projectIdeas = [] as IdeationData[];
  const user = await getUser();

  const currentVoyageTeam = user.voyageTeamMembers.find(
    (voyage) => voyage.voyageTeam.voyage.status.name === "Active"
  );

  if (currentVoyageTeam) {
    projectIdeas = await fetchProjectIdeas({
      teamId: currentVoyageTeam.voyageTeamId,
    });
  } else {
    redirect("/");
  }

  return (
    <>
      <Preloader data={projectIdeas} />
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
          <IdeationComponentWrapper projectIdeas={projectIdeas} />
        </Suspense>
      </div>
    </>
  );
}
