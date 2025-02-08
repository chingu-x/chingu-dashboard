import TextInput from "@/components/inputs/TextInput";

export default function PersonalInfoForm() {
  return (
    <div className="py-10">
      <TextInput id="firstName" label="First Name" placeholder="e.g. John" />
      <TextInput id="lastName" label="Last Name" placeholder="e.g. Smith" />
    </div>
  );
}
