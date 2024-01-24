"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import DropDownLink from "./DropDownLink";
import Button from "@/components/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clientSignOut } from "@/store/features/auth/authSlice";
import { serverSignOut } from "@/app/(auth)/authService";

export default function DropDown({
  name,
  openState,
}: {
  name: string;
  openState: boolean;
}) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(openState);
  const currentVoyage = useAppSelector(
    (state) => state.user.voyageTeamMembers[0]?.voyageTeam.name,
  );
  const menuRef = useRef<HTMLUListElement>(null);
  const closed = "hidden";
  const open =
    "absolute z-[1] p-2 mt-2 shadow bg-base-100 right-0 border border-neutral rounded-2xl";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //--------------------------------------------------------------------------------------
  //'closeMenu' handleClickOutside' and 'useEffect' allow user to
  //close menu on clicking anywhere but the menu.
  const closeMenu = () => {
    setIsOpen(false);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      closeMenu();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);
  //-------------------------------------------------------------------------------------
  async function handleClick() {
    await serverSignOut();
    dispatch(clientSignOut());
  }

  return (
    <div className="relative py-0 mx-2 ">
      <label
        tabIndex={0}
        className="flex btn m-0 p-0 bg-transparent border-none hover:border-none hover:bg-transparent text-base-300"
        onClick={toggleMenu}
      >
        {name} <ChevronDownIcon className="w-4 text-base-300" />
      </label>
      <ul tabIndex={0} className={isOpen ? open : closed} ref={menuRef}>
        {/**Check if user is on voyage. If so, display voyage name/link*/}
        {currentVoyage && <DropDownLink title={currentVoyage} />}
        <DropDownLink title="404???" href="/hello404" />
        <Button title="signout" type="button" onClick={handleClick}>
          Sign Out
        </Button>
      </ul>
    </div>
  );
}
