import Link from "next/link";
import { Banner } from "@chingu-x/components/banner";
import Image from "next/image";
import { Button } from "@chingu-x/components/button";
import routePaths from "@/utils/routePaths";

function ResetCompletedContainer() {
  return (
    <div className="flex min-h-[349px] w-[400px] flex-col items-center rounded-2xl bg-base-200 p-6 xl:ml-60">
      <p className="mb-[22px] mt-2.5 text-center text-2xl font-medium text-base-300">
        Password Reset!
      </p>
      <Banner
        imageLight={
          <Image
            src="/img/diamond_light.png"
            alt="Light Reset Password Image"
            fill={true}
            sizes="125px"
            priority
            style={{ objectFit: "contain" }}
          />
        }
        imageDark={
          <Image
            src="/img/diamond_dark.png"
            alt="Dark Reset Password Image"
            fill={true}
            sizes="125px"
            priority
            style={{ objectFit: "contain" }}
          />
        }
        height="h-[112px]"
        width="w-[125px]"
      />
      <p className="pb-8 text-center text-xl font-medium text-base-300">
        Password Reset Successfully
      </p>
      <p className="pb-8 text-base font-medium text-base-300">
        Your password has been reset, please click the button below to sign in
        to access your Chingu account.
      </p>
      <Link href={routePaths.signIn()} className="w-full">
        <Button className="w-full">Sign in</Button>
      </Link>
    </div>
  );
}

export default ResetCompletedContainer;
