import FeaturesContainer from "./components/FeaturesContainer";
import { featuresLists } from "./components/fixtures/Features";

import Banner from "@/components/banner/Banner";

function FeaturesPage() {
  const currentUser = {
    id: "25b7b76c-1567-4910-9d50-e78819daccf1",
    teamId: 17,
  };

  const data = featuresLists;

  return (
    <>
      <Banner
        imageLight="/img/features_banner_light.png"
        imageDark="/img/features_banner_dark.png"
        alt="features_banner"
        title="Features"
        description="What's on the feature menu for our app? We want only the crème de la crème, so prioritize wisely. Remember, we're building an app, not a buffet."
      />
      <FeaturesContainer data={data} currentUser={currentUser} />
    </>
  );
}

export default FeaturesPage;
