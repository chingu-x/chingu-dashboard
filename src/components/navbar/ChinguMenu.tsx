"use client";

import Image from "next/image";

export default function ChinguMenu() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/chingu_logo.png"
        width={50}
        height={50}
        alt="Chingu Logo"
        priority={false}
      />
      <h2 className="text-white font-semibold text-lg">Chingu</h2>
    </div>
  );
}
