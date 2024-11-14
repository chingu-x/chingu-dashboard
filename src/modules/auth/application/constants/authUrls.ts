const AuthUrls = {
  login() {
    return "/api/v1/auth/login";
  },
  logout() {
    return "/api/v1/auth/logout";
  },
} as const;

export default AuthUrls;
