import Link from "next/link";
import React from "react";
import Button from "@/components/Button";
import Banner from "@/components/banner/Banner";

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
    <div className="flex grow flex-row">
      <div className="flex h-full flex-col justify-between gap-y-4">
        <p className="mt-3 text-xl font-semibold">{title}</p>
        <p className="text-base font-medium">{description}</p>
        <Link href={link}>
          <Button variant="outline" className="w-full text-base font-semibold">
            {buttonTitle}
          </Button>
        </Link>
      </div>
      {imageLight && imageDark ? (
        <div className="flex h-full w-full flex-col justify-center">
          <Banner
            imageLight={imageLight}
            imageDark={imageDark}
            alt="Pre Voyage image"
            height="h-[160px]"
            width="w-full"
          />
        </div>
      ) : null}
    </div>
  );
}

export default EmptyWidgetContent;
