const AuthUrls = {
  login() {
    return "/api/v1/auth/login";
  },
  logout() {
    return "/api/v1/auth/logout";
  },
  requestResetPassword() {
    return "/api/v1/auth/reset-password/request";
  },
  resetPassword() {
    return "/api/v1/auth/reset-password";
  },
} as const;

export default AuthUrls;
