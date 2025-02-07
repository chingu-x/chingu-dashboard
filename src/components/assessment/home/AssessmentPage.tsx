import Button from "@/components/Button";
import Image from "next/image";

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
        <div
          alt="icon-container"
          className="relative flex h-[200px] w-[231px] items-center justify-center"
        >
          <Image
            src="/img/assessment-home-icon/bg_circle.png"
            alt="assessment-home"
            width={231}
            height={200}
            className="absolute inset-0 mx-auto my-auto"
          />
          <Image
            src="/img/assessment-home-icon/operation2.png"
            alt="operation2"
            width={23}
            height={21}
            className="absolute left-[164.28px] top-[160.99px] text-[#217A56]"
          />
          <Image
            src="/img/assessment-home-icon/operation1.png"
            alt="operation1"
            width={15}
            height={19}
            className="absolute left-[253px] top-[179px] text-[#14B8A6]"
          />
          <Image
            src="/img/assessment-home-icon/operation3.png"
            alt="operation3"
            width={17}
            height={23}
            className="absolute left-[223px] text-[#14B8A6]"
          />

          <Image
            src="/img/assessment-home-icon/code1.png"
            alt="code1"
            width={21}
            height={10}
            className="absolute left-[375px] top-[104px] text-[#E6624B]"
          />
          <Image
            src="/img/assessment-home-icon/node2.png"
            alt="node2"
            width={21}
            height={14}
            className="absolute left-[295px] top-[23px] text-[#FFE5b4]"
          />
          <Image
            src="/img/assessment-home-icon/curlies.png"
            alt="curlies"
            width={87}
            height={114}
            className="absolute left-[180px] top-[48px] rotate-[3.76deg] text-[#EEEFF0] opacity-50"
          />
          <Image
            src="/img/assessment-home-icon/angle_bracket.png"
            alt="angle_bracket"
            width={87}
            height={113}
            className="absolute left-[273px] top-[57px] rotate-[-6.33deg] text-[#EEEFF0]"
          />
        </div>
        <div
          alt="header-intro"
          className="flex flex-col items-center justify-center text-center"
        >
          <p className="font-inter h-[40px] w-[700px] text-left text-[39px] leading-[40px]">
            Hey there tech Wizard!
          </p>
          <p className="font-inter decoration-skip-ink h-[72px] w-[700px] text-left text-[20px] font-medium leading-[24px] text-[#16171A]">
            What's your tech superpower level? Are you a beginner Batman or an
            expert Iron Man? Let us know so we can team you up with the right
            sidekick.
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
          <Button className="font-inter h-[47px] w-[207px] w-full gap-[8px] rounded-lg bg-[#217A56] px-[22px] py-[10px] py-[14px] text-[16px] font-semibold leading-[19px] text-[#F5F5F5]">
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
          <Button className="font-inter h-[47px] w-[207px] w-full gap-[8px] rounded-lg bg-[#217A56] px-[22px] py-[10px] py-[14px] text-[16px] font-semibold leading-[19px] text-[#F5F5F5]">
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
            UX Design
          </p>
          <p className="font-inter h-[19px] w-[8px] text-center text-[16px] font-medium leading-[19px] text-[#000000]">
            -
          </p>
          <Button className="font-inter h-[47px] w-[207px] w-full gap-[8px] rounded-lg bg-[#217A56] px-[22px] py-[10px] py-[14px] text-[16px] font-semibold leading-[19px] text-[#F5F5F5]">
            Coming Soon
          </Button>
        </div>
      </div>
    </div>
  );
}
