import { Question } from "@/myVoyage/sprints/components/WeeklyCheckInWrapper";

export function getQuestionType(question: Question) {
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
