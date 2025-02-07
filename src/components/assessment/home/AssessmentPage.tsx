import Image from "next/image";
import Button from "@/components/Button";

export default function AssessmentPage() {
  return (
    <div
      alt="component-container"
      className="left-[250px] mt-[76px] flex h-[547px] w-[1478px] flex-col items-center justify-center gap-[75px] px-[40px]"
    >
      <div
        alt="header"
        className="flex min-h-[200px] w-[1300px] min-w-[895px] flex-row items-center justify-center gap-[40px] rounded-[16px] text-2xl font-light"
      >
        <Image
          src="/img/assessment/home.png"
          alt="home"
          width={231}
          height={200}
          className="h-[200px] w-[231px]"
        />
        <div
          alt="header-intro"
          className="flex flex-col items-start justify-center"
        >
          <p className="h-[40px] w-[700px] text-left text-[39px] leading-[40px]">
            Hey there tech Wizard!
          </p>
          <p className="h-[72px] w-[700px] text-left text-[20px] font-medium leading-[24px] text-[#16171A]">
            What&lsquo;s your tech superpower level? Are you a beginner Batman
            or an expert Iron Man? Let us know so we can team you up with the
            right sidekick.
          </p>
        </div>
      </div>
      <div
        alt="tile-row"
        className="flex h-[192px] w-[1398px] flex-row gap-[40px]"
      >
        <div
          alt="tile"
          className="flex h-[192px] w-[439px] flex-col items-center justify-center gap-[24px] rounded-[16px] bg-[#F5F5F5] p-[24px]"
        >
          <p
            alt="tile-name"
            className="font-inter decoration-skip-ink h-[30px] w-[283px] text-center text-[25px] font-semibold leading-[30px]"
          >
            Front End Development
          </p>
          <p className="font-inter h-[19px] w-[8px] text-center text-[16px] font-medium leading-[19px] text-[#000000]">
            -
          </p>
          <Button className="font-inter h-[47px] w-[207px] w-full gap-[8px] rounded-lg bg-[#217A56] px-[22px] py-[14px] text-[16px] font-semibold leading-[19px] text-[#F5F5F5]">
            Take Assessment
          </Button>
        </div>
        <div
          alt="tile"
          className="flex h-[192px] w-[439.33px] flex-col items-center justify-center gap-[24px] rounded-[16px] bg-[#F5F5F5] p-[24px]"
        >
          <p
            alt="tile-name"
            className="font-inter decoration-skip-ink h-[30px] w-[283px] text-center text-[25px] font-semibold leading-[30px]"
          >
            Back End Development
          </p>
          <p className="font-inter h-[19px] w-[8px] text-center text-[16px] font-medium leading-[19px] text-[#000000]">
            -
          </p>
          <Button className="font-inter h-[47px] w-[207px] w-full gap-[8px] rounded-lg bg-[#217A56] px-[22px] py-[14px] text-[16px] font-semibold leading-[19px] text-[#F5F5F5]">
            Take Assessment
          </Button>
        </div>
        <div
          alt="tile"
          className="flex h-[192px] w-[439.33px] flex-col items-center justify-center gap-[24px] rounded-[16px] bg-[#E3E5EB] p-[24px]"
        >
          <p
            alt="tile-name"
            className="font-inter decoration-skip-ink h-[30px] w-[283px] text-center text-[25px] font-semibold leading-[30px]"
          >
            UX Design
          </p>
          <p className="font-inter h-[19px] w-[8px] text-center text-[16px] font-medium leading-[19px] text-[#000000]">
            -
          </p>
          <Button className="font-inter h-[47px] w-[207px] w-full gap-[8px] rounded-lg bg-[#217A56] px-[22px] py-[14px] text-[16px] font-semibold leading-[19px] text-[#F5F5F5]">
            Coming Soon
          </Button>
        </div>
      </div>
    </div>
  );
}
