import Image from "next/image";
import Button from "@/components/Button";

function EmailCheckModalContainer() {
  return (
    <div className="flex flex-col items-center w-[451px] min-h-[652px] bg-base-200 rounded-2xl xl:ml-60 px-6 py-9">
      <p className="text-base-300 text-2xl text-center mb-[26px] font-medium">
        Welcome to Chingu
      </p>
      <div
        data-hide-on-theme="dark"
        className="flex h-[171px] w-[168px] relative shrink-0"
      >
        <Image
          src="/img/link_retro_mac_light.png"
          alt="Light login image"
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
        />
      </div>
      <div
        data-hide-on-theme="light"
        className="flex h-[171px] w-[168px] relative shrink-0"
      >
        <Image
          src="/img/link_retro_mac_dark.png"
          alt="Light login image"
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
        />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-base-300 text-xl font-medium mt-8">
          Check Your Email Address
        </p>
        <p className="text-base-300 text-base font-medium">
          If that email address exists, we will send an email to it with a link
          to reset your password. Please open it and click on the link in it to
          reset your password.
        </p>
        <p className="text-base-300 text-base font-medium mt-6 mb-[166px]">
          If you have not received an email shortly, then please check your
          spam/trash folders or click the button below to request a new reset
          email.
        </p>
      </div>
      <Button
        type="button"
        title="Resend Email"
        customClassName="text-base gap-x-0 border-none font-semibold capitalize bg-base-100 text-base-300 hover:bg-base-100 w-full"
      >
        Resend Email
      </Button>
    </div>
  );
}

export default EmailCheckModalContainer;
