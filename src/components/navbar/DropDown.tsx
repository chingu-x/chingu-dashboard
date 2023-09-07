import DropDownLink from "./DropDownLink";

export default function DropDown({ name }: { name: string }) {
  return (
    <div className="dropdown py-0 mx-1 dropdown-bottom">
      <label
        tabIndex={0}
        className="btn m-0 p-0 bg-transparent border-none hover:border-none hover:bg-transparent"
      >
        {name}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box right-0"
      >
        <DropDownLink title="Link 1" />
        <DropDownLink title="404???" href="/hello404" />
      </ul>
    </div>
  );
}
