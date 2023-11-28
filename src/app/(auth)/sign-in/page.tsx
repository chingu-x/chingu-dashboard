"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateTextInput } from "@/helpers/form/validateInput";
import Button from "@/components/Button";
import TextInput from "@/components/inputs/TextInput";

const validationSchema = z.object({
  email: validateTextInput({
    inputName: "Email",
    required: true,
    isEmail: true,
  }),
  password: validateTextInput({
    inputName: "Password",
    required: true,
    minLen: 8,
    maxLen: 20,
  }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function Component() {
  const {
    register,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <div className="flex items-center justify-center">
      <div className="flex min-h-[486px] flex-col justify-center">
        <div
          data-hide-on-theme="dark"
          className="h-[300px] w-[628px] relative shrink-0"
        >
          <Image
            src="/img/login_image_light.png"
            alt="Light login image"
            fill={true}
            style={{ objectFit: "contain" }}
            priority={true}
          />
        </div>
        <div
          data-hide-on-theme="light"
          className="h-[300px] w-[628px] relative shrink-0"
        >
          <Image
            src="/img/login_image_dark.png"
            alt="Dark login image"
            fill={true}
            style={{ objectFit: "contain" }}
            priority={true}
          />
        </div>
        <h3 className="text-primary-focus text-2xl text-center mt-[27px] font-semibold">
          Ready to dive in?
        </h3>
        <h2 className="text-primary text-3xl text-center font-semibold">
          Join Chingu today!
        </h2>
      </div>
      <div className="w-[403px] h-[652px] bg-base-200 rounded-2xl ml-60 p-6">
        <p className="text-primary-focus text-2xl text-center mt-[27px] font-semibold">
          Welcome to Chingu
        </p>
        <div className="flex flex-col items-center">
          <Button
            type="button"
            title="github"
            customClassName="text-base gap-x-0 font-semibold bg-base-200 hover:bg-base-content hover:border-base-100 capitalize text-base-300 h-16 mt-2 mb-2 border-2 border-base-100 w-full"
            iconSrc="/img/github.png"
          >
            Continue with Github
          </Button>
          <Button
            type="button"
            title="github"
            customClassName="text-base gap-x-0 font-semibold bg-base-200 hover:bg-base-content hover:border-base-100 capitalize text-base-300 h-16 mt-2 mb-2 border-2 border-base-100 w-full"
            iconSrc="/img/github.png"
          >
            Continue with Github
          </Button>
          <Button
            type="button"
            title="github"
            customClassName="text-base gap-x-0 font-semibold bg-base-200 hover:bg-base-content hover:border-base-100 capitalize text-base-300 h-16 mt-2 mb-2 border-2 border-base-100 w-full"
            iconSrc="/img/github.png"
          >
            Continue with Github
          </Button>
        </div>
        <form
          onSubmit={() => console.log("submit")}
          className="flex flex-col overflow-hidden"
        >
          <div className="flex flex-col min-h-[90px]">
            <div className="flex flex-col">
              <TextInput
                id="email"
                label="email"
                placeholder="Enter Your Email"
                register={register("email")}
                errors={errors}
              />
              <TextInput
                id="password"
                label="password"
                placeholder="Enter Your Password"
                register={{ ...register("password") }}
                errors={errors}
                maxLength={30}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 pt-8">
            <Button
              type="submit"
              title="submit"
              customClassName="text-base gap-x-0 border-none font-semibold capitalize bg-primary text-base-300 hover:bg-primary-focus"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
