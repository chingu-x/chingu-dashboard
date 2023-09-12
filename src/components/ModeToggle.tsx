"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, useEffect, useState } from "react";

export default function ModeToggle() {
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
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === "light"}
      />
      <MoonIcon className="w-6 h-6 duration-200 fill-current swap-on" />
      <SunIcon className="w-6 h-6 duration-200 fill-current swap-off" />
    </label>
  );
}
