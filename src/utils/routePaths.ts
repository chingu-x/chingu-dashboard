// Add all routes being used in the project here
// todo: add routes here

const routePaths = {
  dashboardPage() {
    return "/";
  },
  signIn() {
    return "/sign-in";
  },
  ideationPage(teamId: string) {
    return `/my-voyage/${teamId}/ideation`;
  },
  addIdeationPage(teamId: string) {
    return `/my-voyage/${teamId}/ideation/new`;
  },
  editIdeationPage(teamId: string, ideationId: string) {
    return `/my-voyage/${teamId}/ideation/${ideationId}/edit`;
  },
};

export default routePaths;
