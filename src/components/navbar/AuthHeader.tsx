"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useAuth, useUser } from "@/store/hooks";
import Avatar from "@/components/avatar/AvatarAlt";
import Button from "@/components/Button";
import Bell from "@/components/navbar/Bell";
import DropDown from "@/components/navbar/DropDown";
import routePaths from "@/utils/routePaths";

const notificationCount = 4;

export default function AuthHeader() {
  const { isAuthenticated } = useAuth();
  const { avatar, firstName, lastName } = useUser();
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
        role="button"
        aria-label={isMenuOpen ? "close menu" : "open menu"}
        ref={menuRef}
        onClick={toggleMenu}
        className="flex items-center px-2"
      >
        <Avatar
          firstName={firstName}
          lastName={lastName}
          avatarUrl={avatar}
          size="xxl"
          className="cursor-pointer"
        />
        <DropDown openState={isMenuOpen} />
      </div>
    </>
  ) : (
    <Link href={routePaths.signIn()}>
      <Button>Log In</Button>
    </Link>
  );
}
