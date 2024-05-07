"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import RocketLaunchIcon from "@heroicons/react/24/solid/RocketLaunchIcon";

import FormItem from "@/myVoyage/sprints/components/forms/FormItem";
import { Question } from "@/myVoyage/sprints/components/WeeklyCheckInWrapper";

import Label from "@/components/inputs/Label";
import Textarea from "@/components/inputs/Textarea";
import RadioGroupVertical from "@/components/inputs/RadioGroup/RadioGroupVertical";
import CheckboxGroupVertical from "@/components/inputs/CheckBoxGroup/CheckboxGroupVertical";
import { RadioGroupItemProps } from "@/components/inputs/RadioGroup/RadioGroupItem";
import RadioGroupHorizontal from "@/components/inputs/RadioGroup/RadioGroupHorizontal";
import RadioGroupRating from "@/components/inputs/RadioGroup/RadioGroupRating";

// TODO: refactor and move it somewhere ???
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

function getIconLabel(text: string) {
  const label = text.split("}} ")[1];
  const regExp = /[^{\}]+(?=})/g;
  const matches = regExp.exec(text);
  if (matches && matches.length !== 0) {
    const [color, iconName] = matches[0].split(/(?=[A-Z])/);
    const icon = getIcon(iconName.toLowerCase(), color);

    return (
      <span className="flex items-center gap-x-4">
        {icon}
        {label}
      </span>
    );
  }

  return text;
}

function getScaleLabel(text: string) {
  const label = text.split("}} ")[1];
  const regExp = /[^{\}]+(?=})/g;
  const matches = regExp.exec(text);
  if (matches && matches.length !== 0) {
    const [color, iconName] = matches[0].split(/(?=[A-Z])/);
    const icon = getIcon(iconName.toLowerCase(), color);

    return (
      <span className="flex items-center gap-x-4">
        {icon}
        {label}
      </span>
    );
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
}

export default function FormInputs({
  question,
  register,
  errors,
}: FormInputsProps) {
  const {
    inputType: { name },
    id,
    text,
    description,
    optionGroup,
    subQuestions,
  } = question;
  const options: RadioGroupItemProps[] = [];

  if (
    name !== "radioGroup" &&
    optionGroup &&
    optionGroup.optionChoices.length !== 0
  ) {
    optionGroup.optionChoices.forEach((option) => {
      const id = option.id.toString();
      let label: string | JSX.Element;
      if (name === "radioIcon") {
        label = getIconLabel(option.text);
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
    const label = text.split("}}")[1]; // TODO: ask backend to stay consistent about a space after }}
    const regExp = /[^{\}]+(?=})/g;
    const matches = regExp.exec(text);

    if (matches && matches.length !== 0) {
      const [left, right] = matches[0].split(",");
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

  if (name === "radioGroup" && subQuestions.length !== 0) {
    return (
      <FormItem isError={!!errors[id.toString()]}>
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
          {subQuestions.map((question) => {
            const { id: questionId, text } = question;
            // Create an option group, ids must be unique even though labels and values are the same
            const options: RadioGroupItemProps[] = [];

            if (optionGroup && optionGroup.optionChoices.length !== 0) {
              optionGroup.optionChoices.forEach((option) => {
                const id = questionId + "" + option.id.toString();
                options.push({ id, label: option.text, value: id });
              });
            }

            return (
              <RadioGroupHorizontal
                key={text}
                title={text}
                options={options}
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
      <FormItem>
        <Label className="font-semibold normal-case">{text}</Label>
        <CheckboxGroupVertical options={options} {...register(id.toString())} />
      </FormItem>
    );
  }

  if (name === "text") {
    return (
      <FormItem isTextField>
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
}
