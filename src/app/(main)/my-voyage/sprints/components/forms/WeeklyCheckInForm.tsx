"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";
import DateTimePicker from "@/components/inputs/DateTimePicker";
import TextInput from "@/components/inputs/TextInput";
import Textarea from "@/components/inputs/Textarea";

import { validateTextInput } from "@/helpers/form/validateInput";
import FormBanner from "./FormBanner";
import Label from "@/components/inputs/Label";

const validationSchema = z.object({
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
    <div className="flex flex-col w-full gap-y-10">
      <FormBanner
        title="Sprint #n Check-in"
        description="The weekly Chingu Check-in is how we support you and your team. It is also how we identify teams and individuals who need help. So, please make sure you submit this every week."
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-y-10"
      >
        {/* Achievements */}
        <div className="flex flex-col items-center w-full p-10 pb-4 bg-base-100 rounded-2xl">
          <div className="max-w-[650px] w-full">
            <Label htmlFor="achievements" className="font-semibold">
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
            <Label htmlFor="voyageGuideFeedback" className="font-semibold">
              If a Product Owner has been assigned to your team do you have feed
              back to share with us about how that's working?
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
            <Label htmlFor="productOwnerFeedback" className="font-semibold">
              If a Product Owner has been assigned to your team do you have feed
              back to share with us about how that's working?
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
            <Label htmlFor="personalProjectShowcase" className="font-semibold">
              Do you have any personal projects you've built that we can
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
            <Label htmlFor="extraComment" className="font-semibold">
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
    </div>
  );
}
