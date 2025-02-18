"use client";

import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { LinkIcon } from "@heroicons/react/24/outline";

import { TextInput, Textarea, Label, RadioGroupVertical, RadioGroupHorizontal, RadioGroupRating } from "@chingu-x/components/inputs";
import { LabelContent } from "./LabelContent";

import FormInputContainer from "@/components/form/FormInputContainer";

import CheckboxGroupVertical from "@/components/inputs/CheckBoxGroup/CheckboxGroupVertical";
import { getOptions, getTextInCurlyBrackets } from "@/utils/form/helpers";
import { type Question, type TeamMemberForCheckbox } from "@/utils/form/types";

interface FormInputProps {
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
}: FormInputProps) {
  const {
    inputType: { name },
    id,
    text,
    description,
    optionGroup,
    subQuestions,
  } = question;

  if (name === "radio" || name === "radioIcon") {
    return (
      <FormInputContainer isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">{text}</Label>
        <RadioGroupVertical
          options={getOptions({ question })}
          {...register(id.toString())}
        />
      </FormInputContainer>
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
      <FormInputContainer
        isError={!!errors[id.toString()]}
        className="px-3"
        isScale
      >
        <div className="flex w-full flex-col items-center gap-y-10 rounded-2xl bg-base-100">
          <Label className="w-full text-center font-semibold normal-case">
            <LabelContent text={text} />
          </Label>
          <div className="flex w-full flex-col">
            <RadioGroupRating
              leftTitle={leftTitle}
              rightTitle={rightTitle}
              options={getOptions({ question })}
              {...register(id.toString())}
            />
          </div>
        </div>
      </FormInputContainer>
    );
  }

  if (name === "boolean") {
    return (
      <FormInputContainer isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">
          <LabelContent text={text} />
        </Label>
        <RadioGroupVertical
          options={getOptions({ question })}
          {...register(id.toString())}
        />
      </FormInputContainer>
    );
  }

  if (name === "radioGroup" && subQuestions.length !== 0) {
    const ids = subQuestions.map((subQuestion) => subQuestion.id);
    const isError = ids.find((id) => errors[id]);

    return (
      <FormInputContainer isError={!!isError}>
        <Label className="font-semibold normal-case">{text}</Label>
        {/* TOP LABELS */}
        <div className="flex flex-col gap-y-5">
          <div className="grid w-full grid-cols-[150px_1fr] items-center justify-between gap-x-4">
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
      </FormInputContainer>
    );
  }

  if (name === "checkbox") {
    return (
      <FormInputContainer isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">{text}</Label>
        <CheckboxGroupVertical
          options={getOptions({ question })}
          {...register(id.toString())}
        />
      </FormInputContainer>
    );
  }

  if (name === "teamMembersCheckbox") {
    return (
      <FormInputContainer isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">{text}</Label>
        <CheckboxGroupVertical
          options={getOptions({ question, teamMembers })}
          {...register(id.toString())}
        />
      </FormInputContainer>
    );
  }

  if (name === "text") {
    return (
      <FormInputContainer isTextField isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">{text}</Label>
        <Textarea
          id={`input${id.toString()}`}
          placeholder={description ? description : "Your answer"}
          {...register(id.toString())}
          errorMessage={errors[id.toString()]?.message}
          rows={2}
        />
      </FormInputContainer>
    );
  }

  if (name === "shortText") {
    return (
      <FormInputContainer isTextField isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">{text}</Label>
        <TextInput
          id={`input${id.toString()}`}
          placeholder={description ? description : "Your answer"}
          {...register(id.toString())}
          errorMessage={errors[id.toString()]?.message}
        />
      </FormInputContainer>
    );
  }

  if (name === "url") {
    return (
      <FormInputContainer isTextField isError={!!errors[id.toString()]}>
        <Label className="font-semibold normal-case">{text}</Label>
        <TextInput
          id={`input${id.toString()}`}
          inputGroupContent={<LinkIcon />}
          placeholder={description ? description : "Please provide a link"}
          {...register(id.toString())}
          errorMessage={errors[id.toString()]?.message}
        />
      </FormInputContainer>
    );
  }
}
