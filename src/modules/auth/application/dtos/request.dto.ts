export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RequestResetPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  password: string;
  token: string;
}
