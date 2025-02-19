// "use client";

// import Icon from "./Icon";

// import { getTextInCurlyBrackets } from "@/utils/form/helpers";

// interface CustomLabelProps {
//   text: string;
//   withIcon?: boolean;
// }

// export function LabelContent({ text, withIcon }: CustomLabelProps) {
//   const labelText = text.split("}}")[1].trim();
//   if (withIcon) {
//     const textInCurlyBrackets = getTextInCurlyBrackets(text);
//     if (textInCurlyBrackets) {
//       const [color, iconName] = textInCurlyBrackets.split(/(?=[A-Z])/);
//       return (
//         <span className="flex items-center gap-x-4">
//           <Icon iconName={iconName} color={color} />
//           {labelText}
//         </span>
//       );
//     }
//   } else {
//     return labelText;
//   }
// }
