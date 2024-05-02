"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import BaseFormPage from "@/myVoyage/sprints/components/forms/BaseFormPage";
import FormItem from "@/myVoyage/sprints/components/forms/FormItem";
import { Question } from "@/myVoyage/sprints/components/WeeklyCheckInWrapper";
import Label from "@/components/inputs/Label";
import Button from "@/components/Button";
import Textarea from "@/components/inputs/Textarea";
import RadioGroupVertical from "@/components/inputs/RadioGroup/RadioGroupVertical";

import {
  validateMultipleChoiceInput,
  validateTextInput,
} from "@/helpers/form/validateInput";
import CheckboxGroupVertical from "@/components/inputs/CheckBoxGroup/CheckboxGroupVertical";

import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";
import { RadioGroupItemProps } from "@/components/inputs/RadioGroup/RadioGroupItem";

interface WeeklyCheckingFormProps {
  sprintNumber: string;
  description: string;
  questions: Question[];
}

export default function WeeklyCheckingForm({
  sprintNumber,
  description,
  questions,
}: WeeklyCheckingFormProps) {
  const dispatch = useAppDispatch();

  // Create ValidationSchema
  interface IField {
    [key: string]:
      | z.ZodString
      | z.ZodEffects<z.ZodString, string, string>
      | z.ZodArray<z.ZodString, "many">
      | z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">;
  }

  const fields: IField[] = [];
  questions.forEach((question) => {
    const { id, answerRequired, multipleAllowed } = question;

    const key = `input${id.toString()}`;
    const field: IField = {};

    if (multipleAllowed) {
      field[key] = validateMultipleChoiceInput({
        required: answerRequired,
      });
    } else {
      field[key] = validateTextInput({
        inputName: "This field",
        required: answerRequired,
      });
    }
    fields.push(field);
  });

  let finalObject: IField = {};
  fields.forEach((field) => {
    const temp = { ...finalObject };
    finalObject = { ...temp, ...field };
  });

  const validationSchema = z.object({ ...finalObject });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
    dispatch(onOpenModal({ type: "checkInSuccess" }));
  };

  return (
    <BaseFormPage
      title={`Sprint #${sprintNumber} Check-in`}
      description={description}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-y-10"
      >
        {questions.map((question) => {
          const { id, text, description, multipleAllowed, optionGroup } =
            question;
          const isRadioGroup =
            optionGroup &&
            optionGroup.optionChoices.length !== 0 &&
            !multipleAllowed;
          const isCheckboxGroup =
            optionGroup &&
            optionGroup.optionChoices.length !== 0 &&
            multipleAllowed;
          const isTextArea =
            !optionGroup || optionGroup?.optionChoices.length === 0;
          const options: RadioGroupItemProps[] = [];

          if (optionGroup && optionGroup.optionChoices.length !== 0) {
            optionGroup.optionChoices.forEach((option) => {
              const id = option.id.toString();
              options.push({ id, label: option.text, value: id });
            });
          }

          return (
            <div key={`question ${id}`}>
              {/* Radio Group */}
              {isRadioGroup && (
                <FormItem>
                  <Label className="font-semibold normal-case">{text}</Label>
                  <RadioGroupVertical
                    options={options}
                    {...register(`input${id.toString()}`)}
                  />
                </FormItem>
              )}
              {/* CheckBox Group */}
              {isCheckboxGroup && (
                <FormItem>
                  <Label className="font-semibold normal-case">{text}</Label>
                  <CheckboxGroupVertical
                    options={options}
                    {...register(`input${id.toString()}`)}
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
                    {...register(`input${id.toString()}`)}
                    errorMessage={errors[`input${id.toString()}`]?.message}
                    rows={2}
                  />
                </FormItem>
              )}
            </div>
          );
        })}
        <Button
          type="submit"
          title="submit"
          disabled={!isDirty || !isValid}
          size="lg"
          variant="primary"
        >
          Submit Check In
        </Button>
      </form>
    </BaseFormPage>
  );
}
