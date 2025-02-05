import { SocialButton } from "@chingu-x/components/social-button";

function SocialLoginButtonsContainer() {
  return (
    <>
      <p className="mb-2 text-base font-medium text-neutral-focus">
        Continue using your social accounts
      </p>
      <div className="flex gap-x-6">
        <SocialButton variant="github">
          Github
        </SocialButton>
        <SocialButton variant="discord">
          Discord
        </SocialButton>
        <SocialButton variant="linkedin">
          LinkedIn
        </SocialButton>
      </div>
    </>
  );
}

export default SocialLoginButtonsContainer;
