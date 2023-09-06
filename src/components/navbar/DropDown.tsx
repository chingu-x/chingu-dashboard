"use client";

import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import DropDownLink from "./DropDownLink";

export default function DropDown({ name }: { name: string }) {
  const ref = useRef<HTMLDetailsElement | null>(null);

  const handleClick = () => {
    if (ref.current) {
      ref.current.open = !open;
    }
  };

  useOnClickOutside(ref, () => handleClick());

  return (
    <details ref={ref}>
      <summary className=" pl-2 text-white font-semibold hover:text-white duration-200">
        {name}
      </summary>
      <ul className="mx-4 p-2 bg-white  left-2 font-medium">
        <li>
          <DropDownLink handleClick={handleClick} title="Link 1" />
          <DropDownLink handleClick={handleClick} title="404???" href="/hello404" />
        </li>
      </ul>
    </details>
  );
}
