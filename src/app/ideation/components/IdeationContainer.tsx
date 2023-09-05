import { VoteCard } from ".";
import { Button } from "@/components";

function IdeationContainer() {
  return (
    <div className="card w-[1280px] h-[457px] bg-primary-content text-neutral-content flex flex-row items-start p-10 gap-x-20">
      <VoteCard />
      <section className="card-body gap-y-7 p-0 w-[1150px] h-[377px] overflow-y-auto pr-2">
        <h2 className="text-xl font-semibold text-neutral-focus">
          Real Estate Crowdsourcing
        </h2>
        <h3 className="text-base text-neutral-focus font-semibold">
          Project Idea
        </h3>
        <p className="text-base text-neutral-focus font-medium">
          A real estate crowdsourcing application is a platform that allows
          individuals to invest in real estate properties without needing to
          purchase entire properties themselves. Through the application,
          investors can pool their money together to fund a real estate project,
          and then receive a portion of the profits once the project is
          complete. The platform typically offers a range of real estate
          projects for investors to choose from, and provides tools to help
          investors track their investments and receive regular updates on the
          progress of each project.
        </p>
        <h3 className="text-base text-neutral-focus font-semibold">
          Vision Statement
        </h3>
        <p className="text-base text-neutral-focus font-medium">
          Our vision is to democratize real estate investment by creating an
          inclusive platform that enables everyone to invest in real estate
          projects, regardless of their financial status. We strive to provide a
          seamless experience for our users by offering a wide range of
          investment options and easy-to-use tools to monitor their investments.
          Our goal is to empower individuals to take control of their financial
          future and build wealth through real estate investments.
        </p>
      </section>
      <Button
        title="Create Project"
        customClassName="w-1/7 btn-primary text-base-content normal-case"
      >
        Create Project
      </Button>
    </div>
  );
}

export default IdeationContainer;
