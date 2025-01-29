import Image from "next/image";
import { Button } from "@chingu-x/components/button";

function SocialLoginButtonsContainer() {
  return (
    <>
      <p className="mb-2 text-base font-medium text-neutral-focus">
        Continue using your social accounts
      </p>
      <div className="flex gap-x-6">
        <Button
          type="button"
          title="Github"
          className="flex h-[100px] w-[100px] flex-col gap-x-2 gap-y-[5px] border-2 border-base-100 bg-base-200 text-sm font-medium capitalize text-base-300 hover:border-base-100 hover:bg-base-content focus:bg-base-content focus:text-black active:bg-base-content"
        >
          <Image
            src={"/img/github.png"}
            width={48}
            height={48}
            alt="Github icon"
          />
          Github
        </Button>
        <Button
          type="button"
          title="Discord"
          className="flex h-[100px] w-[100px] flex-col gap-x-2 gap-y-[5px] border-2 border-base-100 bg-base-200 text-sm font-medium capitalize text-base-300 hover:border-base-100 hover:bg-base-content focus:bg-base-content focus:text-black active:bg-base-content"
        >
          <Image
            src={"/img/discord.png"}
            width={48}
            height={48}
            alt="Discord icon"
          />
          Discord
        </Button>
        <Button
          type="button"
          title="LinkedIn"
          className="flex h-[100px] w-[100px] flex-col gap-x-2 gap-y-[5px] border-2 border-base-100 bg-base-200 text-sm font-medium capitalize text-base-300 hover:border-base-100 hover:bg-base-content focus:bg-base-content focus:text-black active:bg-base-content"
        >
          <Image
            src={"/img/linkedin.png"}
            width={48}
            height={48}
            alt="LinkedIn icon"
          />
          LinkedIn
        </Button>
      </div>
    </>
  );
}

export default SocialLoginButtonsContainer;
