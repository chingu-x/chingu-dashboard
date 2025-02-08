import { LinkIcon } from "@heroicons/react/24/outline";
import TextInput from "@/components/inputs/TextInput";

export default function LinkedInUrl() {
  return (
    <div className="flex flex-col gap-8 py-10">
      <h2 className="text-2xl font-semibold text-base-300">
        If you are on LinkedIn what is your profile URL?
      </h2>
      <div>
        <p className="w-full text-right text-[10px] font-medium text-neutral">
          (optional)
        </p>
        <TextInput
          id="url"
          placeholder="e.g. https://www.linkedin.com/yourprofile"
          ariaLabel="link"
          inputGroupContent={<LinkIcon />}
        />
      </div>
    </div>
  );
}
