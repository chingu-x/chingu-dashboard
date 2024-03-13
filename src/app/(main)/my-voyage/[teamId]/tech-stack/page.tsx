import TechStackContainer from "./components/TechStackContainer";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";
import Banner from "@/components/banner/Banner";

export default function TeckStackPage() {
  return (
    <>
      <VoyagePageBannerContainer
        title="Tech Stack"
        description="Alright, let's get down to business. We need to figure out which tech stack we're going to use to power this bad boy. Are you a JavaScript junkie, a Python pro, a Java genius, or a Ruby rockstar? Let's vote"
      >
        <Banner
          imageLight="/img/tech_stack_banner_light.png"
          imageDark="/img/tech_stack_banner_dark.png"
          alt="teck_stack_banner"
          height="h-[200px]"
          width="w-[276px]"
        />
      </VoyagePageBannerContainer>
      <TechStackContainer />
    </>
  );
}
