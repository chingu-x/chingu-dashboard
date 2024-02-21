"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  communicationOptions,
  contributionOptions,
  deployToProductionOptions,
  learningTimeOptions,
  onMyOwnTimeOptions,
  pairProgrammingTimeOptions,
  teamProgress,
  teamTimeOptions,
} from "./radioGroupData";
import { TeamMembersOptions, topicsCoveredOptions } from "./checkboxGroupData";

import BaseFormPage from "@/app/(main)/my-voyage/sprints/components/forms/BaseFormPage";
import Label from "@/components/inputs/Label";
import Button from "@/components/Button";
import Textarea from "@/components/inputs/Textarea";
import RadioGroup from "@/components/inputs/RadioGroup";

import { validateTextInput } from "@/helpers/form/validateInput";
import CheckboxGroup from "@/components/inputs/CheckboxGroup";

const validationSchema = z.object({
  communication: validateTextInput({
    inputName: "Communication",
    required: true,
  }),
  contribution: validateTextInput({
    inputName: "Contribution",
    required: true,
  }),
  teamProgress: validateTextInput({
    inputName: "Team Progress",
    required: true,
  }),
  pairProgrammingTime: validateTextInput({
    inputName: "Pair Programming Time",
    required: true,
  }),
  onMyOwnTime: validateTextInput({
    inputName: "On My Own Time",
    required: true,
  }),
  learningTime: validateTextInput({
    inputName: "Learning&research Time",
    required: true,
  }),
  teamTime: validateTextInput({
    inputName: "Team activities Time",
    required: true,
  }),
  // TODO: update validation
  topicsCovered: z.string().array().min(1),
  deployToProduction: validateTextInput({
    inputName: "Deploy to production",
    required: true,
  }),
  notActive: z.string().array(),
  achievements: validateTextInput({
    inputName: "Achievements",
    required: true,
  }),
  voyageGuideFeedback: validateTextInput({
    inputName: "Voyage Guide Feedback",
    required: true,
  }),
  productOwnerFeedback: validateTextInput({
    inputName: "Product Owner Feedback",
    required: true,
  }),
  personalProjectShowcase: validateTextInput({
    inputName: "Personal Project Showcase",
    required: true,
  }),
  extraComment: validateTextInput({
    inputName: "Extra Comment",
    required: true,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function MeetingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
  };

  return (
    <BaseFormPage
      title="Sprint #n Check-in"
      description="The weekly Chingu Check-in is how we support you and your team. It is also how we identify teams and individuals who need help. So, please make sure you submit this every week."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-y-10"
      >
        {/* Communication */}
        <div className="flex flex-col items-center w-full p-10 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full flex flex-col gap-y-10">
            <Label className="font-semibold normal-case">
              How did you communicate with your team this past week?
            </Label>
            <RadioGroup
              options={communicationOptions}
              {...register("communication")}
            />
          </div>
        </div>
        {/* Contribution */}
        <div className="flex flex-col items-center w-full p-10 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full flex flex-col gap-y-10">
            <Label className="font-semibold normal-case">
              Did you contribute to the project for your team this past week?
            </Label>
            <RadioGroup
              options={contributionOptions}
              {...register("contribution")}
            />
          </div>
        </div>
        {/* Team Progress */}
        <div className="flex flex-col items-center w-full p-10 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full flex flex-col gap-y-10">
            <Label className="font-semibold normal-case">
              How would you rate your team's progress right now?
            </Label>
            <RadioGroup options={teamProgress} {...register("teamProgress")} />
          </div>
        </div>
        {/* Time Distribution */}
        <div className="flex flex-col items-center w-full p-10 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full flex flex-col gap-y-10">
            <Label className="font-semibold normal-case">
              How did you spend time on your project this week?
            </Label>
            {/* TOP LABELS */}
            <div className="flex flex-col gap-y-5">
              <div className="w-full grid grid-cols-[150px_1fr] gap-x-4 items-center justify-between">
                <span></span>
                <div className="flex justify-between pl-6 pr-4">
                  {pairProgrammingTimeOptions.map(({ label }) => (
                    <span
                      key={label}
                      className="text-base font-medium text-base-300"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              {/* PAIR PROGRAMMING */}
              <RadioGroup
                title="Pair programming"
                options={pairProgrammingTimeOptions}
                {...register("pairProgrammingTime")}
              />
              {/* ON MY OWN */}
              <RadioGroup
                title="On my own"
                options={onMyOwnTimeOptions}
                {...register("onMyOwnTime")}
              />
              {/* LEARNING & RESEARCH */}
              <RadioGroup
                title="Learning & research"
                options={learningTimeOptions}
                {...register("learningTime")}
              />
              {/* TEAM ACTIVITIES TIME */}
              <RadioGroup
                title="Team activities (eg. meetings, debugging, etc.)"
                options={teamTimeOptions}
                {...register("teamTime")}
              />
            </div>
          </div>
        </div>
        {/* Topics Covered */}
        <div className="flex flex-col items-center w-full p-10 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full flex flex-col gap-y-10">
            <Label className="font-semibold normal-case">
              What topics did your meetings cover this week? (Select all that
              apply)
            </Label>
            <CheckboxGroup
              options={topicsCoveredOptions}
              {...register("topicsCovered")}
            />
          </div>
        </div>
        {/* Deploy to production */}
        <div className="flex flex-col items-center w-full p-10 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full flex flex-col gap-y-10">
            <Label className="font-semibold normal-case">
              Did you deploy to Production at the end of this Sprint?
            </Label>
            <RadioGroup
              options={deployToProductionOptions}
              {...register("deployToProduction")}
            />
          </div>
        </div>
        {/* Not Active Users */}
        <div className="flex flex-col items-center w-full p-10 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full flex flex-col gap-y-10">
            <Label className="font-semibold normal-case">
              Is there anyone on your team who has not been active? If yes,
              please select the user. If no, move onto the next question.
            </Label>
            <CheckboxGroup
              options={TeamMembersOptions}
              {...register("notActive")}
            />
          </div>
        </div>
        {/* Achievements */}
        <div className="flex flex-col items-center w-full p-10 pb-4 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full">
            <Label htmlFor="achievements" className="font-semibold normal-case">
              Please share any personal or team achievements this week here.
              (ex. held a meeting, teammate got a job, had a pair programming
              session, learned a valuable team lesson, solved a challenging
              problem).
            </Label>
            <Textarea
              id="achievements"
              placeholder="Your answer"
              {...register("achievements")}
              errorMessage={errors.achievements?.message}
              className="mt-10"
              rows={2}
            />
          </div>
        </div>
        {/* Voyage Guide Feedback */}
        <div className="flex flex-col items-center w-full p-10 pb-4 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full">
            <Label
              htmlFor="voyageGuideFeedback"
              className="font-semibold normal-case"
            >
              If a Product Owner has been assigned to your team do you have feed
              back to share with us about how that&apos;s working?
            </Label>
            <Textarea
              id="voyageGuideFeedback"
              placeholder="Your answer"
              {...register("voyageGuideFeedback")}
              errorMessage={errors.voyageGuideFeedback?.message}
              className="mt-10"
              rows={2}
            />
          </div>
        </div>
        {/* Product Owner Feedback */}
        <div className="flex flex-col items-center w-full p-10 pb-4 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full">
            <Label
              htmlFor="productOwnerFeedback"
              className="font-semibold normal-case"
            >
              If a Product Owner has been assigned to your team do you have feed
              back to share with us about how that&apos;s working?
            </Label>
            <Textarea
              id="productOwnerFeedback"
              placeholder="Your answer"
              {...register("productOwnerFeedback")}
              errorMessage={errors.productOwnerFeedback?.message}
              className="mt-10"
              rows={2}
            />
          </div>
        </div>
        {/* Personal Project Showcase */}
        <div className="flex flex-col items-center w-full p-10 pb-4 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full">
            <Label
              htmlFor="personalProjectShowcase"
              className="font-semibold normal-case"
            >
              Do you have any personal projects you&apos;ve built that we can
              showcase in the Weekly Update? (these can be from anytime in your
              coding history! We want to showcase it!)
            </Label>
            <Textarea
              id="personalProjectShowcase"
              placeholder="Your answer"
              {...register("personalProjectShowcase")}
              errorMessage={errors.personalProjectShowcase?.message}
              className="mt-10"
              rows={2}
            />
          </div>
        </div>
        {/* Extra comment */}
        <div className="flex flex-col items-center w-full p-10 pb-4 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full">
            <Label htmlFor="extraComment" className="font-semibold normal-case">
              Please provide any extra other comments, concerns, lessons
              learned, something you want to learn, etc. here. The more the
              better since this helps us find ways to support teams & improve
              the process. Thanks!
            </Label>
            <Textarea
              id="extraComment"
              placeholder="Your answer"
              {...register("extraComment")}
              errorMessage={errors.extraComment?.message}
              className="mt-10"
              rows={2}
            />
          </div>
        </div>
        <Button
          type="submit"
          title="submit"
          disabled={!isDirty || !isValid}
          size="lg"
          variant="primary"
        >
          Submit Check In
        </Button>
      </form>
    </BaseFormPage>
  );
}
