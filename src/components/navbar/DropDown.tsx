'use client'
import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import DropDownLink from "./DropDownLink";
import Button from "@/components/Button";
import { useAppDispatch } from "@/store/hooks";
import { clientSignOut } from "@/store/features/auth/authSlice";
import { serverSignOut } from "@/app/(auth)/authService";

export default function DropDown({ name }: { name: string }) {
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLUListElement>(null);
  const [ isOpen, setIsOpen ] = useState(false);
  const closed = "hidden";
  const open = "absolute dropdown-content z-[1] menu p-2 mt-2 shadow bg-base-100 right-0 border border-neutral rounded-2xl";

  //'toggleMenu' attached to chevron
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  
  //'closeMenu' handleClickOutside' and 'useEffect' allow user to 
  //close menu on clicking anywhere but the menu
  const closeMenu = () => {
    setIsOpen(false)
  }
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      closeMenu();
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  },[isOpen])


  async function handleClick() {
    await serverSignOut();
    dispatch(clientSignOut());
  }

  return (
    <div className="relative dropdown py-0 mx-2 dropdown-bottom">
      <label
        tabIndex={0}
        className="flex btn m-0 p-0 bg-transparent border-none hover:border-none hover:bg-transparent text-base-300"
        onClick={toggleMenu}
      >
        {name} <ChevronDownIcon className="w-4 text-base-300" />
      </label>      
      <ul
        tabIndex={0}
        className={isOpen ? open : closed}
        ref={menuRef}
      >
        <DropDownLink title="Link 1" />
        <DropDownLink title="404???" href="/hello404" />
        <Button title="signout" type="button" onClick={handleClick}>
          Sign Out
        </Button>
      </ul>
    </div>
  );
}
