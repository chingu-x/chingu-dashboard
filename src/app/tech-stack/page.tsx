import TechStackContainer from "./components/TechStackContainer";
import BannerWrapper from "@/components/BannerWrapper";

export default function TeckStackPage() {
  return (
    <>
      <BannerWrapper
        imageLight="/img/tech_stack_banner_light.png"
        imageDark="/img/tech_stack_banner_dark.png"
        alt="teck_stack_banner"
        title="Tech Stack"
        description="Alright, let's get down to business. We need to figure out which tech stack we're going to use to power this bad boy. Are you a JavaScript junkie, a Python pro, a Java genius, or a Ruby rockstar? Let's vote"
      />
      <TechStackContainer />;
    </>
  );
}
