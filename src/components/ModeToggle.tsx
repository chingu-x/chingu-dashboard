"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, useEffect, useState } from "react";

interface ModeToggleProps {
  isAuthPage: boolean;
}

export default function ModeToggle({ isAuthPage }: ModeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked === true ? "light" : "dark");
  };

  return (
    <label className={`swap swap-rotate ${isAuthPage ? "mr-10" : ""}`}>
      <input
        data-testid="mode-toggle"
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === "light"}
      />
      <MoonIcon className="w-6 h-6 duration-200 fill-current swap-on text-base-300" />
      <SunIcon className="w-6 h-6 duration-200 fill-current swap-off text-base-300" />
    </label>
  );
}
