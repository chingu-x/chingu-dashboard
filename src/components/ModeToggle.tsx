"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ModeToggleButton } from "@chingu-x/components/mode-toggle-button";

export default function ModeToggle() {
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
  const activeTheme = theme === "system" && resolvedTheme ? resolvedTheme : theme;

  const toggleTheme = () => {
    setTheme(activeTheme === "light" ? "dark" : "light");
  };

  return (
    <ModeToggleButton theme={activeTheme as "light" | "dark"} onChange={toggleTheme} />
  );
}
