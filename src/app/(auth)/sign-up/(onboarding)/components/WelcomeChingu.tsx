import { Banner } from "@chingu-x/components/banner";
import { Button } from "@chingu-x/components/button";
import Image from "next/image";

interface WelcomeChinguProps {
  handleBegin?: () => void;
}

export default function WelcomeChingu({ handleBegin }: WelcomeChinguProps) {
  return (
    <>
      <div className="flex flex-col gap-11">
        <div className="flex flex-col justify-center gap-6">
          {/* image container */}
          <div className="flex justify-center">
            <Banner
              imageLight={
                <Image
                  src="/img/illustration_onboarding_light.png"
                  alt="Login light image"
                  fill={true}
                  sizes="628px"
                  priority
                  style={{ objectFit: "contain" }}
                />
              }
              imageDark={
                <Image
                  src="/img/illustration_onboarding_dark.png"
                  alt="Login dark image"
                  fill={true}
                  sizes="628px"
                  priority
                  style={{ objectFit: "contain" }}
                />
              }
              height="h-[300px]"
              width="w-[628px]"
            />
          </div>
          {/* text container */}
          <div className="flex flex-col justify-center gap-2" >
            <h3 className="text-center text-4xl font-bold leading-10 text-primary">
              <span className="text-base-300">Welcome,</span> Chingu!
            </h3>
            <p className="mt-[27px] max-w-2xl text-center text-2xl font-medium text-base-300">
              In Korean, Chingu means &quot;friend&quot;&mdash;and that&apos;s
              exactly what we&apos;re here to be!
            </p>
          </div>
        </div>
        <Button onClick={handleBegin} className="mt-10 w-full">
          Begin
        </Button>
      </div>
    </>
  );
}
