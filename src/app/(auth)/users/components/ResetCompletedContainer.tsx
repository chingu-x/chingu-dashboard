import Link from "next/link";
import Button from "@/components/Button";
import routePaths from "@/utils/routePaths";
import Banner from "@/components/banner/Banner";

function ResetCompletedContainer() {
  return (
    <div className="w-[400px] min-h-[349px] bg-base-200 rounded-2xl xl:ml-60 p-6 flex flex-col items-center">
      <p className="text-base-300 text-2xl text-center mt-2.5 mb-[22px] font-medium">
        Password Reset!
      </p>
      <Banner
        imageLight="/img/diamond_light.png"
        imageDark="/img/diamond_dark.png"
        height="h-[112px]"
        width="w-[125px]"
        alt="Reset Password Image"
      />
      <p className="text-base-300 text-xl font-medium pb-8 text-center">
        Password Reset Successfully
      </p>
      <p className="text-base-300 text-base font-medium pb-8">
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
