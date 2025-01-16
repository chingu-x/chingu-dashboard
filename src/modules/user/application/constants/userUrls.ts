const UserUrls = {
  getUser() {
    return "/api/v1/users/me";
  },
} as const;

export default UserUrls;
