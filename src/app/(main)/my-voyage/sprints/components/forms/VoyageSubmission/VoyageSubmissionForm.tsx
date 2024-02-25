"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { scaleOptions } from "./radioGroupDate";

import BaseFormPage from "@/app/(main)/my-voyage/sprints/components/forms/BaseFormPage";
import Label from "@/components/inputs/Label";
import Button from "@/components/Button";
import Textarea from "@/components/inputs/Textarea";
import RadioGroupRating from "@/components/inputs/RadioGroup/RadioGroupRating";

import { validateTextInput } from "@/helpers/form/validateInput";
import TextInput from "@/components/inputs/TextInput";

import { useAppDispatch } from "@/store/hooks";
import { onOpen } from "@/store/features/modal/modalSlice";
import { LinkIcon } from "@heroicons/react/24/outline";

const validationSchema = z.object({
  projectName: validateTextInput({
    inputName: "Project Name",
    required: true,
  }),
  projectDescription: validateTextInput({
    inputName: "Project Description",
    required: true,
  }),
  // TODO: update validation for links
  githubRepo: validateTextInput({
    inputName: "Github repo",
    required: true,
  }),
  deployedProjectLink: validateTextInput({
    inputName: "Deployed Project Link",
  }),
  showcaseLink: validateTextInput({
    inputName: "Showcase Link",
  }),
  positiveAspects: validateTextInput({
    inputName: "Positive Aspects",
  }),
  challengingAspects: validateTextInput({
    inputName: "Challenging Aspects",
  }),
  extraComment: validateTextInput({
    inputName: "Extra comment",
  }),
  scale: validateTextInput({
    inputName: "Scale",
    required: true,
  }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

export default function VoyageSubmissionForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
    dispatch(onOpen({ type: "voyageSuccess" }));
  };

  return (
    <BaseFormPage
      title="Voyage Submission"
      description="Submit and share your finished Chingu project!"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-y-10"
      >
        {/* Project Name */}
        <div className="flex flex-col items-center w-full p-10 pb-4 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full flex flex-col gap-y-10">
            <Label htmlFor="projectName" className="font-semibold normal-case">
              What is the name of the project?
            </Label>
            <Textarea
              id="projectName"
              placeholder="Your answer"
              {...register("projectName")}
              errorMessage={errors.projectName?.message}
              rows={2}
            />
          </div>
        </div>
        {/* Project Description */}
        <div className="flex flex-col items-center w-full p-10 pb-4 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full flex flex-col gap-y-10">
            <Label
              htmlFor="projectDescription"
              className="font-semibold normal-case"
            >
              Please describe the project in a sentence or two.
            </Label>
            <Textarea
              id="projectDescription"
              placeholder="Your answer"
              {...register("projectDescription")}
              errorMessage={errors.projectDescription?.message}
              rows={2}
            />
          </div>
        </div>
        {/* Github Repo */}
        <div className="flex flex-col items-center w-full p-10 pb-4 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full flex flex-col gap-y-10">
            <Label htmlFor="githubRepo" className="font-semibold normal-case">
              Please link your Github repo:
            </Label>
            <TextInput
              id="githubRepo"
              placeholder="Please provide a link"
              inputGroupContent={<LinkIcon />}
              {...register("githubRepo")}
              errorMessage={errors.githubRepo?.message}
            />
          </div>
        </div>
        {/* Deployed Project Link */}
        <div className="flex flex-col items-center w-full p-10 pb-4 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full flex flex-col gap-y-10">
            <Label
              htmlFor="deployedProjectLink"
              className="font-semibold normal-case"
            >
              Please link your deployed project:
            </Label>
            <TextInput
              id="deployedProjectLink"
              placeholder="Please provide a link"
              inputGroupContent={<LinkIcon />}
              {...register("deployedProjectLink")}
              errorMessage={errors.deployedProjectLink?.message}
            />
          </div>
        </div>
        {/* Showcase Link*/}
        <div className="flex flex-col items-center w-full p-10 pb-4 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full flex flex-col gap-y-10">
            <Label htmlFor="showcaseLink" className="font-semibold normal-case">
              If you have a project showcase video, please provide the public
              link:
            </Label>
            <TextInput
              id="showcaseLink"
              placeholder="Please provide a link"
              inputGroupContent={<LinkIcon />}
              {...register("showcaseLink")}
              errorMessage={errors.showcaseLink?.message}
            />
          </div>
        </div>
        {/* Positive Aspects */}
        <div className="flex flex-col items-center w-full p-10 pb-4 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full flex flex-col gap-y-10">
            <Label
              htmlFor="positiveAspects"
              className="font-semibold normal-case"
            >
              What stood out as the most positive aspects of your experience?
            </Label>
            <Textarea
              id="positiveAspects"
              placeholder="Your answer"
              {...register("positiveAspects")}
              errorMessage={errors.positiveAspects?.message}
              rows={2}
            />
          </div>
        </div>
        {/* Challenging Aspects */}
        <div className="flex flex-col items-center w-full p-10 pb-4 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full flex flex-col gap-y-10">
            <Label
              htmlFor="challengingAspects"
              className="font-semibold normal-case"
            >
              What proved to be the most challenging aspect of the team project?
            </Label>
            <Textarea
              id="challengingAspects"
              placeholder="Your answer"
              {...register("challengingAspects")}
              errorMessage={errors.challengingAspects?.message}
              rows={2}
            />
          </div>
        </div>
        {/* Extra comment */}
        <div className="flex flex-col items-center w-full p-10 pb-4 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full flex flex-col gap-y-10">
            <Label htmlFor="extraComment" className="font-semibold normal-case">
              Is there anything else you&apos;d like to share or comment on
              regarding your experience?
            </Label>
            <Textarea
              id="extraComment"
              placeholder="Your answer"
              {...register("extraComment")}
              errorMessage={errors.extraComment?.message}
              rows={2}
            />
          </div>
        </div>
        {/* Scale */}
        <div className="flex flex-col items-center w-full p-10 bg-base-100 rounded-2xl">
          <div className="flex flex-col items-center w-full gap-y-10">
            <Label className="font-semibold normal-case max-w-[650px] w-full">
              On a scale of 0-10, how likely are you to suggest Chingu to a
              friend or colleague?
            </Label>
            {/* TOP LABELS */}
            <div className="flex flex-col max-w-[880px] w-full">
              <RadioGroupRating
                leftTitle="Not Likely"
                rightTitle="Extremely Likely"
                options={scaleOptions}
                {...register("scale")}
              />
            </div>
          </div>
        </div>
        <Button
          type="submit"
          title="submit"
          disabled={!isDirty || !isValid}
          size="lg"
          variant="primary"
        >
          Submit Voyage
        </Button>
      </form>
    </BaseFormPage>
  );
}
