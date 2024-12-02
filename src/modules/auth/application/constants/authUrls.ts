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
} as const;

export default AuthUrls;
