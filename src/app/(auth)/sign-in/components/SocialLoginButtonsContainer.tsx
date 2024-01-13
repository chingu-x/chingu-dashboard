import Button from "@/components/Button";
import Image from "next/image";

function SocialLoginButtonsContainer() {
  return (
    <>
      <Button
        type="button"
        title="Github"
        className="text-base font-semibold bg-base-200 hover:bg-base-content hover:border-base-100 capitalize text-base-300 h-16 mt-2 mb-2 border-2 border-base-100 w-full gap-x-2 active:bg-base-content focus:bg-base-content focus:text-black"
      >
        <Image
          src={"/img/github.png"}
          width={48}
          height={48}
          alt="Github icon"
        />
        Continue with Github
      </Button>
      <Button
        type="button"
        title="Discord"
        className="text-base font-semibold bg-base-200 hover:bg-base-content hover:border-base-100 capitalize text-base-300 h-16 mt-2 mb-2 border-2 border-base-100 w-full gap-x-2 active:bg-base-content focus:bg-base-content focus:text-black"
      >
        <Image
          src={"/img/discord.png"}
          width={48}
          height={48}
          alt="Discord icon"
        />
        Continue with Discord
      </Button>
      <Button
        type="button"
        title="LinkedIn"
        className="text-base font-semibold bg-base-200 hover:bg-base-content hover:border-base-100 capitalize text-base-300 h-16 mt-2 mb-2 border-2 border-base-100 w-full gap-x-2 active:bg-base-content focus:bg-base-content focus:text-black"
      >
        <Image
          src={"/img/linkedin.png"}
          width={48}
          height={48}
          alt="LinkedIn icon"
        />
        Continue with LinkedIn
      </Button>
    </>
  );
}

export default SocialLoginButtonsContainer;
