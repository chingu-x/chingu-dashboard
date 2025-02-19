import { Banner } from "@chingu-x/components/banner";
import Image from "next/image";
import { Button } from "@chingu-x/components/button";

function ConfirmationMailContainer() {
  return (
    <div className="flex min-h-[652px] w-[400px] flex-col items-center rounded-2xl bg-base-200 px-6 py-9 xl:ml-60">
      <p className="mb-[26px] text-center text-2xl font-medium text-base-300">
        Welcome to Chingu!
      </p>
      <div>
        <Banner
          imageLight={
            <Image
              src="/img/retro_mac_light.png"
              alt="Light email verification image"
              fill={true}
              sizes="168px"
              priority
              style={{ objectFit: "contain" }}
            />
          }
          imageDark={
            <Image
              src="/img/retro_mac_dark.png"
              alt="Dark email verification image"
              fill={true}
              sizes="168px"
              priority
              style={{ objectFit: "contain" }}
            />
          }
          height="h-[171px]"
          width="w-[168px]"
        />
      </div>
      <div className="flex flex-col items-center">
        <p className="mt-8 text-xl font-medium text-base-300">
          Verify Your Email Address
        </p>
        <p className="text-base font-medium text-base-300">
          An email was sent to the address you gave us. To get access to Chingu
          and all of our features, please check your email and verify it.
        </p>
        <p className="mb-[166px] mt-6 text-base font-medium text-base-300">
          If you have not received an email shortly, then please check your
          spam/trash folders or click the button below to request a new
          verification email.
        </p>
      </div>
      <Button
        type="button"
        title="Resend Email"
        variant="outline"
        className="w-full"
      >
        Resend Email
      </Button>
    </div>
  );
}

export default ConfirmationMailContainer;
