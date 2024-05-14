import { type Question } from "./types";

interface CreateFormResponseBody {
  data: {
    [x: string]: (string | string[]) & (string | string[] | undefined);
  };
  questions: Question[];
}

export function createFormResponseBody({
  data,
  questions,
}: CreateFormResponseBody) {
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
      (question) =>
        question.id === Number(key) ||
        question.subQuestions.find(
          (subQuestion) => subQuestion.id === Number(key),
        ),
    );

    if (question && question.inputType.name === "boolean") {
      response = { questionId: Number(key), boolean: value === "true" };
      responses.push(response);
    }

    if (
      question &&
      (question.inputType.name === "radio" ||
        question.inputType.name === "radioIcon" ||
        question.inputType.name === "scale" ||
        question.inputType.name === "radioGroup")
    ) {
      response = { questionId: Number(key), optionChoiceId: Number(value) };
      responses.push(response);
    }

    if (
      question &&
      (question.inputType.name === "checkbox" ||
        question.inputType.name === "teamMembersCheckbox")
    ) {
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

    if (
      question &&
      (question.inputType.name === "text" ||
        question.inputType.name === "shortText")
    ) {
      response = {
        questionId: Number(key),
        text: value as string,
      };
      responses.push(response);
    }
  }

  return responses;
}
