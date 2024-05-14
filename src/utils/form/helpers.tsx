import Image from "next/image";
import RocketLaunchIcon from "@heroicons/react/24/solid/RocketLaunchIcon";

import {
  type TeamMemberForCheckbox,
  type Question,
  type SubQuestion,
} from "@/myVoyage/sprints/components/WeeklyCheckInWrapper";

import { type RadioGroupItemProps } from "@/components/inputs/RadioGroup/RadioGroupItem";
import { type CheckboxGroupItemProps } from "@/components/inputs/CheckBoxGroup/CheckboxGroupItem";

const Colors = {
  green: "text-success",
  amber: "text-warning",
  red: "text-error",
};

function getIcon(iconName: string, color: string) {
  if (iconName === "rocket") {
    return (
      <RocketLaunchIcon
        className={`w-6 h-5 ${Colors[color as keyof typeof Colors]}`}
      />
    );
  }
}

export function getTextInCurlyBrackets(text: string) {
  const regExp = /[^{\}]+(?=})/g;
  const matches = regExp.exec(text);
  if (matches && matches.length !== 0) {
    return matches[0];
  } else {
    return null;
  }
}

export function getLabel(text: string, withIcon?: boolean) {
  const label = text.split("}}")[1].trim();
  if (withIcon) {
    const textInCurlyBrackets = getTextInCurlyBrackets(text);
    if (textInCurlyBrackets) {
      const [color, iconName] = textInCurlyBrackets.split(/(?=[A-Z])/);
      const icon = getIcon(iconName.toLowerCase(), color);

      return (
        <span className="flex items-center gap-x-4">
          {icon}
          {label}
        </span>
      );
    }
  } else {
    return label;
  }
  return text;
}

interface GetOptionsProps {
  question: Question;
  subQuestion?: SubQuestion;
  teamMembers?: TeamMemberForCheckbox[];
}

export function getOptions({
  question,
  subQuestion,
  teamMembers,
}: GetOptionsProps) {
  const {
    inputType: { name },
    id,
    text,
    optionGroup,
  } = question;
  const options: RadioGroupItemProps[] | CheckboxGroupItemProps[] = [];

  if (
    (name === "radio" ||
      name === "radioIcon" ||
      name === "checkbox" ||
      name === "scale") &&
    optionGroup &&
    optionGroup.optionChoices.length !== 0
  ) {
    optionGroup.optionChoices.forEach((option) => {
      const id = option.id.toString();
      let label: string | JSX.Element;
      if (name === "radioIcon") {
        label = getLabel(option.text, true);
        options.push({ id, label, value: id });
      } else {
        options.push({ id, label: option.text, value: id });
      }
    });
  }

  if (name === "boolean") {
    let trueText = "";
    let falseText = "";
    const textInCurlyBrackets = getTextInCurlyBrackets(text);

    if (textInCurlyBrackets) {
      const [left, right] = textInCurlyBrackets.split(",");
      trueText = left;
      falseText = right;
    }
    options.push({ id: id + trueText, value: "true", label: trueText });
    options.push({ id: id + falseText, value: "false", label: falseText });
  }

  if (subQuestion) {
    const { id: subQuestionId } = subQuestion;

    // Create an option group, ids must be unique even though labels and values are the same
    if (optionGroup && optionGroup.optionChoices.length !== 0) {
      optionGroup.optionChoices.forEach((option) => {
        const id = subQuestionId + "" + option.id.toString();
        options.push({
          id,
          label: option.text,
          value: option.id.toString(),
        });
      });
    }
  }

  if (
    name === "teamMembersCheckbox" &&
    teamMembers &&
    teamMembers.length !== 0
  ) {
    teamMembers.forEach((member) => {
      const { firstName, lastName, avatar } = member;
      const teamMemberId = member.id;

      const option = {
        id: `teamMember${teamMemberId.toString()}`,
        value: teamMemberId.toString(),
        label: (
          <span className="flex items-center gap-x-2">
            <Image
              width={16}
              height={16}
              className="capitalize rounded-full"
              src={avatar}
              alt={`${firstName} ${lastName}`}
            />
            {firstName}
          </span>
        ),
      };
      options.push(option);
    });
  }
  return options;
}
