"use client";

import Image from "next/image";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import RocketLaunchIcon from "@heroicons/react/24/solid/RocketLaunchIcon";

import FormItem from "@/myVoyage/sprints/components/forms/FormItem";
import {
  type TeamMemberForCheckbox,
  type Question,
} from "@/myVoyage/sprints/components/WeeklyCheckInWrapper";

import Label from "@/components/inputs/Label";
import Textarea from "@/components/inputs/Textarea";
import RadioGroupVertical from "@/components/inputs/RadioGroup/RadioGroupVertical";
import CheckboxGroupVertical from "@/components/inputs/CheckBoxGroup/CheckboxGroupVertical";
import { type RadioGroupItemProps } from "@/components/inputs/RadioGroup/RadioGroupItem";
import RadioGroupHorizontal from "@/components/inputs/RadioGroup/RadioGroupHorizontal";
import RadioGroupRating from "@/components/inputs/RadioGroup/RadioGroupRating";
import TextInput from "@/components/inputs/TextInput";
import { type CheckboxGroupItemProps } from "@/components/inputs/CheckBoxGroup/CheckboxGroupItem";

// TODO: ask the backend tean to change colors: green => success etc ??
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

function getTextInCurlyBrackets(text: string) {
  const regExp = /[^{\}]+(?=})/g;
  const matches = regExp.exec(text);
  if (matches && matches.length !== 0) {
    return matches[0];
  } else {
    return null;
  }
}

function getLabel(text: string, withIcon?: boolean) {
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

interface FormInputsProps {
  question: Question;
  register: UseFormRegister<{
    [x: string]: (string | string[]) & (string | string[] | undefined);
  }>;
  errors: FieldErrors<{
    [x: string]: (string | string[]) & (string | string[] | undefined);
  }>;
  teamMembers?: TeamMemberForCheckbox[];
}

export default function FormInputs({
  question,
  register,
  errors,
  teamMembers,
}: FormInputsProps) {
  const {
    inputType: { name },
    id,
    text,
    description,
    optionGroup,
    subQuestions,
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

  if (name === "radio") {
    return (
      <FormItem isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">{text}</Label>
        <RadioGroupVertical options={options} {...register(id.toString())} />
      </FormItem>
    );
  }

  if (name === "radioIcon") {
    return (
      <FormItem isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">{text}</Label>
        <RadioGroupVertical options={options} {...register(id.toString())} />
      </FormItem>
    );
  }

  if (name === "scale") {
    let leftTitle = "";
    let rightTitle = "";
    const label = getLabel(text);
    const textInCurlyBrackets = getTextInCurlyBrackets(text);

    if (textInCurlyBrackets) {
      const [left, right] = textInCurlyBrackets.split(",");
      leftTitle = left;
      rightTitle = right;
    }

    return (
      <FormItem isError={!!errors[id.toString()]} className="px-3" isScale>
        <div className="flex flex-col items-center w-full bg-base-100 rounded-2xl gap-y-10">
          <Label className="w-full font-semibold text-center normal-case">
            {label}
          </Label>
          {/* TOP LABELS */}
          <div className="flex flex-col w-full">
            <RadioGroupRating
              leftTitle={leftTitle}
              rightTitle={rightTitle}
              options={options}
              {...register(id.toString())}
            />
          </div>
        </div>
      </FormItem>
    );
  }

  if (name === "boolean") {
    let trueText = "";
    let falseText = "";
    const label = getLabel(text);
    const textInCurlyBrackets = getTextInCurlyBrackets(text);

    if (textInCurlyBrackets) {
      const [left, right] = textInCurlyBrackets.split(",");
      trueText = left;
      falseText = right;
    }

    options.push({ id: id + trueText, value: "true", label: trueText });
    options.push({ id: id + falseText, value: "false", label: falseText });

    return (
      <FormItem isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">{label}</Label>
        <RadioGroupVertical options={options} {...register(id.toString())} />
      </FormItem>
    );
  }

  if (name === "radioGroup" && subQuestions.length !== 0) {
    const ids = subQuestions.map((subQuestion) => subQuestion.id);
    const isError = ids.find((id) => errors[id]);

    return (
      <FormItem isError={!!isError}>
        <Label className="font-semibold normal-case">{text}</Label>
        {/* TOP LABELS */}
        <div className="flex flex-col gap-y-5">
          <div className="w-full grid grid-cols-[150px_1fr] gap-x-4 items-center justify-between">
            <span></span>
            <div className="flex justify-between pl-6 pr-4">
              {optionGroup?.optionChoices.map(({ text }) => (
                <span
                  key={text}
                  className="text-base font-medium text-base-300"
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
          {subQuestions
            .sort((a, b) => a.order - b.order)
            .map((question) => {
              const { id: questionId, text } = question;
              // Create an option group, ids must be unique even though labels and values are the same
              const radioGroupOptions: RadioGroupItemProps[] = [];

              if (optionGroup && optionGroup.optionChoices.length !== 0) {
                optionGroup.optionChoices.forEach((option) => {
                  const id = questionId + "" + option.id.toString();
                  radioGroupOptions.push({
                    id,
                    label: option.text,
                    value: option.id.toString(),
                  });
                });
              }

              return (
                <RadioGroupHorizontal
                  key={text}
                  title={text}
                  options={radioGroupOptions}
                  {...register(questionId.toString())}
                />
              );
            })}
        </div>
      </FormItem>
    );
  }

  if (name === "checkbox") {
    return (
      <FormItem isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">{text}</Label>
        <CheckboxGroupVertical options={options} {...register(id.toString())} />
      </FormItem>
    );
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

    return (
      <FormItem isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">{text}</Label>
        <CheckboxGroupVertical options={options} {...register(id.toString())} />
      </FormItem>
    );
  }

  if (name === "text") {
    return (
      <FormItem isTextField isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">{text}</Label>
        <Textarea
          id={`input${id.toString()}`}
          placeholder={description ? description : "Your answer"}
          {...register(id.toString())}
          errorMessage={errors[id.toString()]?.message}
          rows={2}
        />
      </FormItem>
    );
  }

  if (name === "shortText") {
    return (
      <FormItem isTextField isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">{text}</Label>
        <TextInput
          id={`input${id.toString()}`}
          placeholder={description ? description : "Your answer"}
          {...register(id.toString())}
          errorMessage={errors[id.toString()]?.message}
        />
      </FormItem>
    );
  }
}
