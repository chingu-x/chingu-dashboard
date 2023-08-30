"use client";

import Image from "next/image";

export default function ChinguMenu() {
  return (
    <Image
      src="/chingu_white_text_logo.svg"
      width={100}
      height={70}
      alt="Chingu Logo"
      priority={true}
    />
  );
}
