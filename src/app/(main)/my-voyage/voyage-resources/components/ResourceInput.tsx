import { LinkIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";

//Input group will replace the TextInputs in this form

export default function ResourceInput() {
  return (
    <form className="flex items-center bg-base-200 rounded-xl shadow-lg p-1 w-5/6">
      <div className=" flex flex-col w-3/4 m-4">
        <div className="flex">
          <div className="bg-neutral-content w-11 h-11 rounded-lg">
            <LinkIcon className="text-base-200 p-2" />
          </div>
          <TextInput
            className="my-0"
            id="link"
            placeholder="Paste your resource link here."
          />
        </div>
        <TextInput
          className="my-0"
          id="title"
          placeholder="Name your resource here."
        />
      </div>
      <Button className="h-1/4 w-1/4 m-4">Share Resource</Button>
    </form>
  );
}
