import Link from "next/link";
import React from "react";
import Image from "next/image";
import Button from "@/components/Button";

interface EmptyWidgetContentProps {
  title: string;
  description: string;
  link: string;
  buttonTitle: string;
  imageLight?: string;
  imageDark?: string;
}
function EmptyWidgetContent({
  title,
  description,
  link,
  buttonTitle,
  imageLight,
  imageDark,
}: EmptyWidgetContentProps) {
  return (
    <div className="flex flex-row flex-grow">
      <div className="flex flex-col gap-y-4 h-full justify-between">
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-base font-medium">{description}</p>
        <Link href={link}>
          <Button variant="outline" className="text-base font-semibold w-full">
            {buttonTitle}
          </Button>
        </Link>
      </div>
      {imageLight && imageDark ? (
        <div className="w-full">
          <div
            data-hide-on-theme="dark"
            className="flex h-[140px] w-full relative shrink-0"
          >
            <Image
              src={imageLight}
              alt="Light pre Voyage image"
              fill={true}
              style={{ objectFit: "contain" }}
              priority={true}
            />
          </div>
          <div
            data-hide-on-theme="light"
            className="flex h-[140px] w-full relative shrink-0"
          >
            <Image
              src={imageDark}
              alt="Light pre Voyage image"
              fill={true}
              style={{ objectFit: "contain" }}
              priority={true}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default EmptyWidgetContent;
