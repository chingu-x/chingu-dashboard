import { Question } from "@/myVoyage/sprints/components/WeeklyCheckInWrapper";
import { getQuestionType } from "./getQuestionType";

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
    const question = questions.find((question) => question.id === Number(key));

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
  return responses;
}
