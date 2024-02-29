"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import Avatar from "@/components/avatar/Avatar";
import Button from "@/components/Button";
import Bell from "@/components/navbar/Bell";
import DropDown from "@/components/navbar/DropDown";
import routePaths from "@/utils/routePaths";

const notificationCount = 4;

export default function AuthHeader() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { avatar } = useAppSelector((state) => state.user);
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
        onClick={toggleMenu}
        className="flex items-center px-2"
      >
        <Avatar image={avatar} height={34} width={34} />
        <DropDown openState={isMenuOpen} />
      </div>
    </>
  ) : (
    <Link href={routePaths.signIn()}>
      <Button>Log In</Button>
    </Link>
  );
}
