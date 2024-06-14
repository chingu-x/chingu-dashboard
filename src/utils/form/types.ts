export type InputType =
  | "radio"
  | "radioGroup"
  | "radioIcon"
  | "checkbox"
  | "boolean"
  | "teamMembersCheckbox"
  | "text"
  | "shortText"
  | "url"
  | "scale";

export interface SubQuestion {
  id: number;
  order: number;
  inputType: { id: number; name: InputType };
  text: string;
  description: string | null;
  answerRequired: boolean;
  multipleAllowed: boolean | null;
  optionGroup: {
    optionChoices: { id: number; text: string }[];
  } | null;
}

export interface Question {
  id: number;
  order: number;
  inputType: { id: number; name: InputType };
  text: string;
  description: string | null;
  answerRequired: boolean;
  multipleAllowed: boolean | null;
  optionGroup: {
    optionChoices: { id: number; text: string }[];
  } | null;
  subQuestions: SubQuestion[];
}

export interface TeamMemberForCheckbox {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
}
