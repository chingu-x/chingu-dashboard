"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, Variants, motion } from "framer-motion";

import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";

interface ModeToggleProps {
  isAuthPage: boolean;
}

export default function ModeToggle({ isAuthPage }: ModeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // If enableSystem is true and the active theme is "system" (when a user firsts visits a website), resolvedTheme returns whether the system preference resolved to "dark" or "light".
  // So we need to set theme to resolvedTheme first time the user visits, but next time the theme is gonna come from localStorage
  if (theme === "system" && resolvedTheme) {
    setTheme(resolvedTheme);
  }

  const toggleTheme = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked === true ? "light" : "dark");
  };

  const modeToggleVariants: Variants = {
    hidden: {
      rotate: 25,
    },
    show: {
      rotate: 0,
    },
  };

  return (
    <label
      className={`relative cursor-pointer flex justify-center items-center ${
        isAuthPage ? "mr-10" : ""
      }`}
    >
      <input
        className="invisible w-0 h-0"
        data-testid="mode-toggle"
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === "light"}
      />
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" && (
          <motion.div
            key="moneIcon"
            variants={modeToggleVariants}
            initial="hidden"
            animate="show"
          >
            <MoonIcon className="w-6 h-6 duration-200 fill-current swap-on text-base-300" />
          </motion.div>
        )}
        {theme === "dark" && (
          <motion.div
            key="sunIcon"
            variants={modeToggleVariants}
            initial="hidden"
            animate="show"
          >
            <SunIcon className="w-6 h-6 duration-200 fill-current swap-off text-base-300" />{" "}
          </motion.div>
        )}
      </AnimatePresence>
    </label>
  );
}
