"use client";

import { z } from "zod";

interface ValidateTextInput {
  inputName: string;
  required?: boolean;
  minLen?: number;
  maxLen?: number;
  isEmail?: boolean;
}

export function validateTextInput({
  inputName,
  required,
  minLen,
  maxLen,
  isEmail,
}: ValidateTextInput): z.ZodString | z.ZodEffects<z.ZodString, string, string> {
  let rules;
  rules = z.string();
  // Required
  if (required || (minLen && minLen === 1)) {
    rules = rules.min(1, { message: `${inputName} is required.` });
  }
  // Must be email
  if (isEmail) {
    rules = rules.email("This is not a valid email.");
  }
  // Minimum Length
  if (minLen && minLen > 1) {
    rules = rules.min(minLen, {
      message: `Must be ${minLen} or more characters long.`,
    });
  }
  // Maximum Length
  if (maxLen) {
    rules = rules.refine(
      (val) => val.length <= maxLen,
      (val) => ({ message: `Character length ${val.length}/${maxLen}` })
    );
  }

  return rules;
}
