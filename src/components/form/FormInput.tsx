"use client";

import { type FieldErrors, type UseFormRegister } from "react-hook-form";

import { LabelContent } from "./LabelContent";

import FormItem from "@/components/form/FormItem";
import Label from "@/components/inputs/Label";
import Textarea from "@/components/inputs/Textarea";
import RadioGroupVertical from "@/components/inputs/RadioGroup/RadioGroupVertical";
import CheckboxGroupVertical from "@/components/inputs/CheckBoxGroup/CheckboxGroupVertical";
import RadioGroupHorizontal from "@/components/inputs/RadioGroup/RadioGroupHorizontal";
import RadioGroupRating from "@/components/inputs/RadioGroup/RadioGroupRating";
import TextInput from "@/components/inputs/TextInput";
import { getOptions, getTextInCurlyBrackets } from "@/utils/form/helpers";
import { type Question, type TeamMemberForCheckbox } from "@/utils/form/types";

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

export default function FormInput({
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

  if (name === "radio") {
    return (
      <FormItem isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">{text}</Label>
        <RadioGroupVertical
          options={getOptions({ question })}
          {...register(id.toString())}
        />
      </FormItem>
    );
  }

  if (name === "radioIcon") {
    return (
      <FormItem isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">{text}</Label>
        <RadioGroupVertical
          options={getOptions({ question })}
          {...register(id.toString())}
        />
      </FormItem>
    );
  }

  if (name === "scale") {
    let leftTitle = "";
    let rightTitle = "";
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
            <LabelContent text={text} />
          </Label>
          {/* TOP LABELS */}
          <div className="flex flex-col w-full">
            <RadioGroupRating
              leftTitle={leftTitle}
              rightTitle={rightTitle}
              options={getOptions({ question })}
              {...register(id.toString())}
            />
          </div>
        </div>
      </FormItem>
    );
  }

  if (name === "boolean") {
    return (
      <FormItem isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">
          <LabelContent text={text} />
        </Label>
        <RadioGroupVertical
          options={getOptions({ question })}
          {...register(id.toString())}
        />
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
            .map((subQuestion) => {
              const { id: subQuestionId, text } = subQuestion;
              return (
                <RadioGroupHorizontal
                  key={text}
                  title={text}
                  options={getOptions({ question, subQuestion })}
                  {...register(subQuestionId.toString())}
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
        <CheckboxGroupVertical
          options={getOptions({ question })}
          {...register(id.toString())}
        />
      </FormItem>
    );
  }

  if (name === "teamMembersCheckbox") {
    return (
      <FormItem isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">{text}</Label>
        <CheckboxGroupVertical
          options={getOptions({ question, teamMembers })}
          {...register(id.toString())}
        />
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
