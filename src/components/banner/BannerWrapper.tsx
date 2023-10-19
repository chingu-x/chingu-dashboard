"use client";
import React from "react";
import { useTheme } from "next-themes";
import Banner from "./Banner";

interface BannerWrapperProps {
  alt: string;
  title: string;
  description: string;
  imageLight: string;
  imageDark: string;
}

function BannerWrapper({
  imageLight,
  imageDark,
  alt,
  title,
  description,
}: BannerWrapperProps) {
  const { theme } = useTheme();

  const getImageBasedOnTheme = () => {
    if (theme === "dark") {
      return imageDark;
    } else {
      return imageLight;
    }
  };

  const image = getImageBasedOnTheme();

  return (
    <Banner image={image} alt={alt} title={title} description={description} />
  );
}

export default BannerWrapper;
