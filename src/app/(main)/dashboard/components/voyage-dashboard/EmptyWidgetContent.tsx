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
    <div className="flex flex-row flex-grow">
      <div className="flex flex-col gap-y-4 h-full justify-between">
        <p className="text-xl font-semibold mt-3">{title}</p>
        <p className="text-base font-medium">{description}</p>
        <Link href={link}>
          <Button variant="outline" className="text-base font-semibold w-full">
            {buttonTitle}
          </Button>
        </Link>
      </div>
      {imageLight && imageDark ? (
        <div className="w-full h-full flex flex-col justify-center">
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
