import { isWithinInterval } from "date-fns";
import { format } from "date-fns-tz";
import { z } from "zod";

interface ValidateTextInput {
  inputName: string;
  required?: boolean;
  minLen?: number;
  maxLen?: number;
  isEmail?: boolean;
  isHours?: boolean;
  isUrl?: boolean;
}

interface ValidateDateTimeInput {
  minDate?: Date;
  maxDate?: Date;
  timezone?: string;
}

interface ValidateMultipleChoiceInput {
  required?: boolean;
}

export function validateTextInput({
  inputName,
  required,
  minLen,
  maxLen,
  isEmail,
  isHours,
  isUrl,
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

  //Must be a url
  if (isUrl) {
    rules = rules.startsWith("https://");
  }

  // Minimum Length
  if (minLen && minLen > 1) {
    rules = rules.min(minLen, {
      message: `Must be ${minLen} or more characters long.`,
    });
  }

  // Only whole numbers
  if (isHours) {
    rules = rules.regex(/^[1-9][0-9]?$/, "Whole numbers only");
  }

  // Maximum Length
  if (maxLen) {
    rules = rules.refine(
      (val) => val.length <= maxLen,
      (val) => ({ message: `Character length ${val.length}/${maxLen}` }),
    );
  }

  return rules;
}

export function validateDateTimeInput({
  minDate,
  maxDate,
  timezone,
}: ValidateDateTimeInput): z.ZodDate | z.ZodEffects<z.ZodDate, Date, Date> {
  let rules;
  rules = z.date();

  if (minDate && maxDate) {
    rules = rules.refine(
      (val) => isWithinInterval(val, { start: minDate, end: maxDate }),
      () => ({
        message: `The meeting should be between ${format(
          minDate,
          "MMM d k:mm (zzz)",
          {
            timeZone: timezone,
          },
        )} and ${format(maxDate, "MMM d k:mm (zzz)", {
          timeZone: timezone,
        })}`,
      }),
    );
  }

  return rules;
}

export function validateMultipleChoiceInput({
  required,
}: ValidateMultipleChoiceInput):
  | z.ZodArray<z.ZodString, "many">
  | z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many"> {
  let rules;
  rules = z.string().array();

  // Required
  if (required) {
    rules = rules.min(1);
  }

  return rules;
}
