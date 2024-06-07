import { z } from "zod";
import { type Question } from "./types";
import {
  validateMultipleChoiceInput,
  validateTextInput,
} from "@/utils/form/validateInput";

interface IField {
  [key: string]:
    | z.ZodString
    | z.ZodEffects<z.ZodString, string, string>
    | z.ZodArray<z.ZodString, "many">
    | z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">;
}

interface IDefaultValue {
  [key: string]: string | string[];
}

export function createValidationSchema(questionsData: Question[]) {
  const fields: IField = {};
  const defaultValues: IDefaultValue = {};

  questionsData.forEach((question) => {
    const {
      id,
      inputType: { name },
      answerRequired,
      subQuestions,
    } = question;

    const key = id.toString();

    if (name === "radioGroup") {
      for (const question of subQuestions) {
        const { id, answerRequired } = question;
        const key = id.toString();
        fields[key] = validateTextInput({
          inputName: "This field",
          required: answerRequired,
        });
        defaultValues[key] = "";
      }
    } else if (name === "checkbox" || name === "teamMembersCheckbox") {
      fields[key] = validateMultipleChoiceInput({
        required: answerRequired,
      });
      defaultValues[key] = [];
    } else {
      fields[key] = validateTextInput({
        inputName: "This field",
        required: answerRequired,
        isUrl: name === "url",
      });
      defaultValues[key] = "";
    }
  });

  return { validationSchema: z.object({ ...fields }), defaultValues };
}
