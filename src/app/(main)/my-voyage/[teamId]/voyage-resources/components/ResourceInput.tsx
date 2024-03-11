import { LinkIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";

export default function ResourceInput() {
  //TODO: Input group/link will replace the TextInputs in this form.
  return (
    <form className="flex items-center w-full p-1 shadow-lg bg-base-200 rounded-xl">
      <div className="flex flex-col w-3/4 m-4 ">
        <TextInput
          id="link"
          placeholder="Paste your resource link here."
          inputGroupContent={<LinkIcon />}
        />
        <TextInput id="title" placeholder="Name your resource here." />
      </div>
      {/* the button will be in disabled state until user puts in a valid url and name */}
      <Button className="w-1/4 m-4 whitespace-nowrap">Share Resource</Button>
    </form>
  );
}
