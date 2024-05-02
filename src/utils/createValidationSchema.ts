import { z } from "zod";
import { Question } from "@/myVoyage/sprints/components/WeeklyCheckInWrapper";
import {
  validateMultipleChoiceInput,
  validateTextInput,
} from "@/helpers/form/validateInput";

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
    const { id, answerRequired, multipleAllowed } = question;

    const key = id.toString();
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

  return z.object({ ...finalObject });
}
