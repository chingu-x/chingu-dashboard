import Image from "next/image";

import {
  type Question,
  type SubQuestion,
  type TeamMemberForCheckbox,
} from "./types";

import { type RadioGroupItemProps } from "@/components/inputs/RadioGroup/RadioGroupItem";
import { type CheckboxGroupItemProps } from "@/components/inputs/CheckBoxGroup/CheckboxGroupItem";
import { LabelContent } from "@/components/form/LabelContent";

export function getTextInCurlyBrackets(text: string) {
  const regExp = /[^{\}]+(?=})/g;
  const matches = regExp.exec(text);
  if (matches && matches.length !== 0) {
    return matches[0];
  } else {
    return null;
  }
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
      if (name === "radioIcon") {
        options.push({
          id,
          label: <LabelContent text={option.text} withIcon={true} />,
          value: id,
        });
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
              className="rounded-full capitalize"
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
