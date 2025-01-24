"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Avatar } from "@chingu-x/components/avatar";
import Image from "next/image";
import { useAuth, useUser } from "@/store/hooks";
import Button from "@/components/Button";
import Bell from "@/components/navbar/Bell";
import DropDown from "@/components/navbar/DropDown";
import routePaths from "@/utils/routePaths";

const notificationCount = 4;

export default function AuthHeader() {
  const { isAuthenticated } = useAuth();
  const { avatar } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
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
  });

  return isAuthenticated ? (
    <>
      <Bell notificationCount={notificationCount} />
      <div
        ref={menuRef}
        data-cy="nav-dropdown-menu"
        onClick={toggleMenu}
        className="flex items-center px-2"
      >
        <Avatar customClassName="h-[34px] w-[34px]">
          <Image src={avatar} alt="user avatar" width={34} height={34} />
        </Avatar>

        <DropDown openState={isMenuOpen} />
      </div>
    </>
  ) : (
    <Link href={routePaths.signIn()}>
      <Button>Log In</Button>
    </Link>
  );
}
