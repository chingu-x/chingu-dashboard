import Image from "next/image";
import Button from "@/components/Button";

function SocialLoginButtonsContainer() {
  return (
    <>
      <p className="text-base font-medium	text-neutral-focus mb-2">
        Continue using your social accounts
      </p>
      <div className="flex gap-x-6">
        <Button
          type="button"
          title="Github"
          className="text-sm font-medium bg-base-200 hover:bg-base-content hover:border-base-100 capitalize text-base-300 border-2 border-base-100 w-[100px] h-[100px] gap-x-2 active:bg-base-content focus:bg-base-content focus:text-black flex flex-col gap-y-[5px]"
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
          className="text-sm font-medium bg-base-200 hover:bg-base-content hover:border-base-100 capitalize text-base-300 border-2 border-base-100 w-[100px] h-[100px] gap-x-2 active:bg-base-content focus:bg-base-content focus:text-black flex flex-col gap-y-[5px]"
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
          className="text-sm font-medium bg-base-200 hover:bg-base-content hover:border-base-100 capitalize text-base-300 border-2 border-base-100 w-[100px] h-[100px] gap-x-2 active:bg-base-content focus:bg-base-content focus:text-black flex flex-col gap-y-[5px]"
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
