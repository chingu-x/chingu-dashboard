import Button from "@/components/Button";

function SocialLoginButtonsContainer() {
  return (
    <>
      <Button
        type="button"
        title="github"
        customClassName="text-base gap-x-0 font-semibold bg-base-200 hover:bg-base-content hover:border-base-100 capitalize text-base-300 h-16 mt-2 mb-2 border-2 border-base-100 w-full"
        iconSrc="/img/github.png"
      >
        Continue with Github
      </Button>
      <Button
        type="button"
        title="github"
        customClassName="text-base gap-x-0 font-semibold bg-base-200 hover:bg-base-content hover:border-base-100 capitalize text-base-300 h-16 mt-2 mb-2 border-2 border-base-100 w-full"
        iconSrc="/img/discord.png"
      >
        Continue with Discord
      </Button>
      <Button
        type="button"
        title="github"
        customClassName="text-base gap-x-0 font-semibold bg-base-200 hover:bg-base-content hover:border-base-100 capitalize text-base-300 h-16 mt-2 mb-2 border-2 border-base-100 w-full"
        iconSrc="/img/linkedin.png"
      >
        Continue with LinkedIn
      </Button>
    </>
  );
}

export default SocialLoginButtonsContainer;
