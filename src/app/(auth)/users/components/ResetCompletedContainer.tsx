import Link from "next/link";
import Button from "@/components/Button";
import routePaths from "@/utils/routePaths";
import Banner from "@/components/banner/Banner";

function ResetCompletedContainer() {
  return (
    <div className="flex min-h-[349px] w-[400px] flex-col items-center rounded-2xl bg-base-200 p-6 xl:ml-60">
      <p className="mb-[22px] mt-2.5 text-center text-2xl font-medium text-base-300">
        Password Reset!
      </p>
      <Banner
        imageLight="/img/diamond_light.png"
        imageDark="/img/diamond_dark.png"
        height="h-[112px]"
        width="w-[125px]"
        alt="Reset Password Image"
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
