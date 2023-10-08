import * as z from "zod";

export const validationSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title is required.",
    })
    .refine(
      (val) => val.length <= 20,
      (val) => ({ message: `Character length ${val.length}/20` })
    ),
  projectIdea: z.string().min(1, {
    message: "Project idea is required.",
  }),
  visionStatement: z
    .string()
    .min(1, {
      message: "Vision statement is required.",
    })
    .refine(
      (val) => val.length <= 100,
      (val) => ({ message: `Character length ${val.length}/100` })
    ),
  luckyNumber: z
    .number()
    .or(
      z
        .string()
        .min(1, {
          message: "Lucky number is required.",
        })
        .regex(/\d+/)
        .transform(Number)
    )
    .refine((n) => n >= 0, {
      message: "It should be a number.",
    }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;
