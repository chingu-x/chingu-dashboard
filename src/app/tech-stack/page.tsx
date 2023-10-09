import TechStackContainer from "./components/TechStackContainer";
import Banner from "@/components/Banner";

export default function TeckStackPage() {
  return (
    <>
      <Banner
        image="/img/tech_stack_banner.svg"
        alt="teck_stack_banner"
        title="Tech Stack"
        description="Alright, let's get down to business. We need to figure out which tech stack we're going to use to power this bad boy. Are you a JavaScript junkie, a Python pro, a Java genius, or a Ruby rockstar? Let's vote"
      />
      <TechStackContainer />;
    </>
  );
}
