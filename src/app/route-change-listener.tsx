"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function RouteChangeListener({ cookie }) {
  const pathname = usePathname();
  const [changes, setChanges] = useState(0);

  console.log(cookie);

  useEffect(() => {
    console.log(`Route changed to: ${pathname}`);
    setChanges((prev) => prev + 1);
  }, [pathname]);

  return null;
}
