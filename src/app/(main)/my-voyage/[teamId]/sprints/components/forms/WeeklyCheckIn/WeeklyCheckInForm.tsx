"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import BaseFormPage from "@/myVoyage/sprints/components/forms/BaseFormPage";
import FormItem from "@/myVoyage/sprints/components/forms/FormItem";
import { Question } from "@/myVoyage/sprints/components/WeeklyCheckInWrapper";
// import { submitCheckInForm } from "@/myVoyage/sprints/sprintsService";
import Label from "@/components/inputs/Label";
import Button from "@/components/Button";
import Textarea from "@/components/inputs/Textarea";
import RadioGroupVertical from "@/components/inputs/RadioGroup/RadioGroupVertical";

import CheckboxGroupVertical from "@/components/inputs/CheckBoxGroup/CheckboxGroupVertical";

// import { useAppDispatch, useUser } from "@/store/hooks";
// import { onOpenModal } from "@/store/features/modal/modalSlice";
import { RadioGroupItemProps } from "@/components/inputs/RadioGroup/RadioGroupItem";
import { createValidationSchema } from "@/utils/createValidationSchema";
// import useServerAction from "@/hooks/useServerAction";

function getQuestionType(question: Question) {
  const isRadioGroup =
    question?.optionGroup &&
    question?.optionGroup.optionChoices.length !== 0 &&
    !question?.multipleAllowed;
  const isCheckboxGroup =
    question?.optionGroup &&
    question?.optionGroup.optionChoices.length !== 0 &&
    question?.multipleAllowed;
  const isTextArea =
    !question?.optionGroup || question?.optionGroup?.optionChoices.length === 0;
  return [isRadioGroup, isCheckboxGroup, isTextArea];
}

interface WeeklyCheckingFormProps {
  sprintNumber: number;
  description: string;
  questions: Question[];
}

export default function WeeklyCheckingForm({
  sprintNumber,
  description,
  questions,
}: WeeklyCheckingFormProps) {
  // const{voyageTeamMembers} = useUser()
  // const dispatch = useAppDispatch();

  const validationSchema = createValidationSchema(questions);

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  // const {
  //   runAction: submitCheckInFormAction,
  //   isLoading: submitCheckInFormLoading,
  //   setIsLoading: setSubmitCheckInFormLoading,
  // } = useServerAction(submitCheckInForm);

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    // console.log(data);

    // Create a necessary object
    type ResponseType = {
      questionId: number;
      text?: string;
      optionChoiceId?: number;
      boolean?: boolean;
      numeric?: number;
    };
    const responses = [] as ResponseType[];

    for (const [key, value] of Object.entries(data)) {
      let response: ResponseType;
      const question = questions.find(
        (question) => question.id === Number(key)
      );

      // TODO: create a function for this booleans, they are used at least twice
      const [isRadioGroup, isCheckboxGroup, isTextArea] = getQuestionType(
        question!
      );

      if (isRadioGroup) {
        response = { questionId: Number(key), optionChoiceId: Number(value) };
        responses.push(response);
      }
      if (isCheckboxGroup) {
        let numeric: number;
        if (Array.isArray(value)) {
          numeric = Number(value.reduce((a, b) => a + b, ""));
          response = {
            questionId: Number(key),
            numeric: numeric,
          };
          responses.push(response);
        }
      }
      if (isTextArea) {
        response = {
          questionId: Number(key),
          text: value as string,
        };
        responses.push(response);
      }
    }
    // console.log(responses);

    //  const [res, error] = await submitCheckInFormAction({
    //   voyageTeamMemberId: idk,
    //   sprintId: sprintNumber,
    //    responses,
    //  });
    //  if (res) {
    //   dispatch(onOpenModal({ type: "checkInSuccess" }));
    //   // TODO: redirect
    //  }
    //  if (error) {
    //    dispatch(
    //      onOpenModal({
    //        type: "error",
    //        content: { message: error.message },
    //      })
    //    );
    //  }
    //  setSubmitCheckInFormLoading(false);
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
          const { id, text, description, optionGroup } = question;
          const [isRadioGroup, isCheckboxGroup, isTextArea] =
            getQuestionType(question);
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
                    {...register(id.toString())}
                  />
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
