"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";

import FormItem from "@/myVoyage/sprints/components/forms/FormItem";
import { Question } from "@/myVoyage/sprints/components/WeeklyCheckInWrapper";

import Label from "@/components/inputs/Label";
import Textarea from "@/components/inputs/Textarea";
import RadioGroupVertical from "@/components/inputs/RadioGroup/RadioGroupVertical";
import CheckboxGroupVertical from "@/components/inputs/CheckBoxGroup/CheckboxGroupVertical";
import { RadioGroupItemProps } from "@/components/inputs/RadioGroup/RadioGroupItem";

import { getQuestionType } from "@/utils/getQuestionType";

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
  const { id, text, description, optionGroup } = question;
  const [isRadioGroup, isCheckboxGroup, isTextArea] = getQuestionType(question);
  const options: RadioGroupItemProps[] = [];

  if (optionGroup && optionGroup.optionChoices.length !== 0) {
    optionGroup.optionChoices.forEach((option) => {
      const id = option.id.toString();
      options.push({ id, label: option.text, value: id });
    });
  }
  return (
    <>
      {/* Radio Group */}
      {isRadioGroup && (
        <FormItem>
          <Label className="font-semibold normal-case">{text}</Label>
          <RadioGroupVertical options={options} {...register(id.toString())} />
        </FormItem>
      )}
      {/* CheckBox Group */}
      {isCheckboxGroup && (
        <FormItem>
          <Label className="font-semibold normal-case">{text}</Label>
          <CheckboxGroupVertical
            options={options}
            {...register(id.toString())}
          />
        </FormItem>
      )}
      {/* TextArea */}
      {isTextArea && (
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
      )}
    </>
  );
}
