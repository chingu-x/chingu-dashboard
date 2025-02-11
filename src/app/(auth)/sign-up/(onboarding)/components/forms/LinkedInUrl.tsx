import { LinkIcon } from "@heroicons/react/24/outline";
import TextInput from "@/components/inputs/TextInput";
import FormWrapper from "@/app/(auth)/sign-up/(onboarding)/components/forms/FormWrapper";
import QuestionHeader from "@/app/(auth)/sign-up/(onboarding)/components/forms/QuestionHeader";
import FormSpacer from "@/app/(auth)/sign-up/(onboarding)/components/forms/FormsSpacer";
import OptionalLabel from "@/app/(auth)/sign-up/(onboarding)/components/forms/OptionalLabel";

export default function LinkedInUrl() {
  return (
    <FormWrapper>
      <div>
        <QuestionHeader>
          If you are on LinkedIn what is your profile URL?
        </QuestionHeader>
        <FormSpacer />
      </div>
      <div>
        <OptionalLabel />
        <TextInput
          id="url"
          placeholder="e.g. https://www.linkedin.com/yourprofile"
          ariaLabel="link"
          inputGroupContent={<LinkIcon />}
        />
      </div>
    </FormWrapper>
  );
}
