import TextInput from "@/components/inputs/TextInput";
import FormWrapper from "@/app/(auth)/sign-up/(onboarding)/components/forms/FormWrapper";

export default function PersonalInfoForm() {
  return (
    <FormWrapper>
      <TextInput id="firstName" label="First Name" placeholder="e.g. John" />
      <TextInput id="lastName" label="Last Name" placeholder="e.g. Smith" />
    </FormWrapper>
  );
}
