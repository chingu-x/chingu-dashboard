"use client";
import { useEffect, useState, useRef } from "react";
import { serverSignIn } from "@/app/(auth)/authService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Bell from "@/components/navbar/Bell";
import DropDown from "@/components/navbar/DropDown";
import { clientSignIn } from "@/store/features/auth/authSlice";

const notificationCount = 4;

export default function AuthHeader() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { avatar } = useAppSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  async function handleClick() {
    await serverSignIn();
    dispatch(clientSignIn());
  }

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

  return (
    <>
      {isAuthenticated ? (
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
        <Button title="Login" type="button" onClick={handleClick}>
          Log In
        </Button>
      )}
    </>
  );
}
