"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import DropDownLink from "./DropDownLink";
import Button from "@/components/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clientSignOut } from "@/store/features/auth/authSlice";
import { serverSignOut } from "@/app/(auth)/authService";

export default function DropDown({
  openState,
}: {
  openState?: boolean;
}) { 
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(openState);
  const currentVoyage = useAppSelector(
    (state) => state.user.voyageTeamMembers[0]?.voyageTeam.name,
  );
  const menuRef = useRef<HTMLUListElement>(null);
  const closed = "hidden";
  const open =
    "absolute z-[1] w-44 p-4 [&>*]:mt-2 mt-6 shadow bg-base-100 right-0 border border-neutral rounded-2xl";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
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
  
  async function handleClick() {
    await serverSignOut();
    dispatch(clientSignOut());
  }

  return (
    <div className="relative py-0 mx-2">
      <label
        tabIndex={0}
        className="flex btn m-0 p-0 bg-transparent border-none hover:border-none hover:bg-transparent text-base-300"
        onClick={toggleMenu}
      >
        <ChevronDownIcon className="w-4 text-base-300 cursor-pointer" />
      </label>
      <ul 
        tabIndex={0} 
        className={isOpen ? open : closed} 
        ref={menuRef}
      >
        <li className="bg-secondary-content text-xs p-2 [&>*]:m-1 rounded-lg ">
          <p className="text-neutral text-xs">
            My Status:
          </p>
          {currentVoyage? 
          <p className="text-base-300 border-[1px] border-transparent font-semibold text-base-300">
            {currentVoyage}
          </p> : 
          <p className="text-base-300 border-[1px] border-transparent font-semibold text-base-300">
            Please join a voyage to see your status information.
          </p>}
        </li>
        <DropDownLink title="Settings" href="/hello404" />
        <Button
          title="signout"
          type="button"
          onClick={handleClick}
          variant="link"
          size={"lg"}
          className="hover:bg-neutral-content hover:text-base-300 w-full flex justify-start p-2 m-0"
        >
          Sign Out
        </Button>
      </ul>
    </div>
  );
}
