"use client";

import Icon from "./Icon";

import { getTextInCurlyBrackets } from "@/utils/form/helpers";

interface CustomLabelProps {
  text: string;
  withIcon?: boolean;
}

export function LabelContent({ text, withIcon }: CustomLabelProps) {
  const label = text.split("}}")[1]?.trim();
  if (withIcon) {
    const textInCurlyBrackets = getTextInCurlyBrackets(text);
    if (textInCurlyBrackets) {
      const [color, iconName] = textInCurlyBrackets.split(/(?=[A-Z])/);
      return (
        <span className="flex items-center gap-x-4">
          <Icon iconName={iconName} color={color} />
          {label}
        </span>
      );
    }
  } else {
    return label;
  }
  return text;
}
