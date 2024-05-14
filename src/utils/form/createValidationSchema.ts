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

export function createValidationSchema(questionsData: Question[]) {
  const fields: IField[] = [];
  questionsData.forEach((question) => {
    const {
      id,
      inputType: { name },
      answerRequired,
      subQuestions,
    } = question;

    const key = id.toString();
    const field: IField = {};

    if (name === "radioGroup") {
      for (const question of subQuestions) {
        const field: IField = {};
        const { id, answerRequired } = question;
        const key = id.toString();
        field[key] = validateTextInput({
          inputName: "This field",
          required: answerRequired,
        });

        fields.push(field);
      }
    } else if (name === "checkbox" || name === "teamMembersCheckbox") {
      field[key] = validateMultipleChoiceInput({
        required: answerRequired,
      });

      fields.push(field);
    } else {
      field[key] = validateTextInput({
        inputName: "This field",
        required: answerRequired,
      });

      fields.push(field);
    }
  });

  let finalObject: IField = {};
  fields.forEach((field) => {
    const temp = { ...finalObject };
    finalObject = { ...temp, ...field };
  });

  return z.object({ ...finalObject });
}
