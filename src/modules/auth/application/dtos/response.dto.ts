interface AuthResponse {
  message: string;
}

export interface LoginResponseDto extends AuthResponse {}

export interface LogoutResponseDto extends AuthResponse {}
