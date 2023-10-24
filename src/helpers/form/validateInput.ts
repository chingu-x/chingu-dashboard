import { z } from "zod";

interface ValidateTextInput {
  required?: boolean;
  minLen?: number;
  maxLen?: number;
  isEmail?: boolean;
  isHours?: boolean;
}

export function validateTextInput({
  required,
  minLen,
  maxLen,
  isEmail,
  isHours,
}: ValidateTextInput): z.ZodString | z.ZodEffects<z.ZodString, string, string> {
  let rules;
  rules = z.string();
  // Required
  if (required || (minLen && minLen === 1)) {
    rules = rules.min(1, { message: "Required" });
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
  // Only whole numbers
  if (isHours) {
    rules = rules.regex(
      /^[1-9][0-9]?$/,
      "You can enter numbers only, such as 5, 10 or 15"
    );
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
