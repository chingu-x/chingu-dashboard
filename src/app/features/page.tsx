import Features from "./components/Features";
import Banner from "@/components/banner/Banner";

function FeaturesPage() {
  return (
    <>
      <Banner
        imageLight="/img/features_banner_light.png"
        imageDark="/img/features_banner_dark.png"
        alt="features_banner"
        title="Features"
        description="What's on the feature menu for our app? We want only the crème de la crème, so prioritize wisely. Remember, we're building an app, not a buffet."
      />
      <Features />
    </>
  );
}

export default FeaturesPage;
