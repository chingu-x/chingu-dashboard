import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

function ResetCompletedContainer() {
  console.log("reset completed");

  return (
    <div className="w-[400px] min-h-[349px] bg-base-200 rounded-2xl xl:ml-60 p-6 flex flex-col items-center">
      <p className="text-base-300 text-2xl text-center mt-2.5 mb-[22px] font-medium">
        Password Reset!
      </p>
      <div
        data-hide-on-theme="dark"
        className="flex h-[112px] w-[125px] relative justify-center items-center mb-[34px]"
      >
        <Image
          src="/img/diamond_light.png"
          alt="Reset password confirmed image"
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
        />
      </div>
      <div
        data-hide-on-theme="light"
        className="flex h-[112px] w-[125px] relative justify-center items-center"
      >
        <Image
          src="/img/diamond_dark.png"
          alt="Reset password confirmed image"
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
        />
      </div>
      <p className="text-base-300 text-xl font-medium pb-8 text-center">
        Password Reset Successfully
      </p>
      <p className="text-base-300 text-base font-medium pb-8">
        Your password has been reset, please click the button below to sign in
        to access your Chingu account.
      </p>
      <Button className="w-full">
        <Link href={"/sign-in"}>Sign in</Link>
      </Button>
      {/* <Button className="w-full" onClick={onClick}>
        Sign in
      </Button> */}
    </div>
  );
}

export default ResetCompletedContainer;
