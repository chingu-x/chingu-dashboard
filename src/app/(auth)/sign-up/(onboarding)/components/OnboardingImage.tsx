"use client";

import Image from "next/image";

interface OnboardingImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function OnboardingImage({
  src,
  alt,
  width = 812,
  height = 395,
}: OnboardingImageProps) {
  return (
    <div className="flex h-full max-w-xl items-center justify-center">
      <div className="overflow-hidden rounded-2xl">
        <Image width={width} height={height} src={src} alt={alt} />
      </div>
    </div>
  );
}
