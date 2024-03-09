import ResourcesContainer from "./ResourcesContainer";
import Banner from "@/components/banner/Banner";

export default function ResourcesPage() {
  return (
    <>
      <Banner
        imageLight="/img/resources_banner_light.png"
        imageDark="/img/resources_banner_dark.png"
        alt="resources_banner"
        title="Resources"
        description="This resources page is your secret weapon for this voyage! Take a look at what your team is sharing or share your own resources for this voyage. Go ahead and be the first to post a new resource for you and your peers!"
      />
      <ResourcesContainer />
    </>
  );
}
