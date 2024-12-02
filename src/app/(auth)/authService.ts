"use server";

import { handleAsync } from "@/utils/handleAsync";
import { type AsyncActionResponse } from "@/utils/handleAsync";
import { UNAUTHPOST } from "@/utils/requests";

interface ResetPasswordRequestProps {
  email?: string;
  token?: string;
  password?: string;
}

export async function resetPasswordRequestEmail(
  email: string,
): Promise<AsyncActionResponse<void>> {
  const asyncPasswordResetEmail = async () =>
    UNAUTHPOST<ResetPasswordRequestProps, void>(
      "api/v1/auth/reset-password/request",
      "no-store",
      {
        email,
      },
    );

  return handleAsync(asyncPasswordResetEmail);
}

export async function resetPassword({
  password,
  token,
}: ResetPasswordRequestProps): Promise<AsyncActionResponse<void>> {
  const asyncResetPassword = async () =>
    UNAUTHPOST<ResetPasswordRequestProps, void>(
      "api/v1/auth/reset-password",
      "no-store",
      {
        password,
        token,
      },
    );

  return handleAsync(asyncResetPassword);
}
