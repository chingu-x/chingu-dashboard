import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { DropDownLink } from ".";

export default function DropDown({ name }: { name: string }) {
  return (
    <div className="dropdown py-0 mx-2 dropdown-bottom">
      <label
        tabIndex={0}
        className="btn m-0 p-0 bg-transparent border-none hover:border-none hover:bg-transparent text-base-300"
      >
        {name} <ChevronDownIcon className="w-4 text-base-300" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 mt-2 shadow bg-base-100 right-0 border border-neutral rounded-2xl"
      >
        <DropDownLink title="Link 1" />
        <DropDownLink title="404???" href="/hello404" />
      </ul>
    </div>
  );
}
