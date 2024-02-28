// Add all routes being used in the project here

const routePaths = {
  dashboardPage() {
    return "/";
  },
  signIn() {
    return "/sign-in";
  },
  signOut() {
    return "/sign-out";
  },
  signUp() {
    return "/sign-up";
  },
  directoryPage(teamId: string) {
    return `/my-voyage/${teamId}/directory`;
  },
  techStackPage(teamId: string) {
    return `/my-voyage/${teamId}/tech-stack`;
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
  featuresPage(teamId: string) {
    return `/my-voyage/${teamId}/features`;
  },
  sprintsPage(teamId: string) {
    return `/my-voyage/${teamId}/sprints`;
  },
  submitVoyage(teamId: string) {
    return `/my-voyage/${teamId}/sprints/voyage-submission`;
  },
  weeklyCheckIn(teamId: string) {
    return `/my-voyage/${teamId}/sprints/weekly-checkin`;
  },
  createMeeting(teamId: string) {
    return `/my-voyage/${teamId}/sprints/create-meeting`;
  },
  addTopic(teamId: string) {
    return `/my-voyage/${teamId}/sprints/add-topic`;
  },
  voyageResourcesPage(teamId: string) {
    return `/my-voyage/${teamId}/voyage-resources`;
  },
};

export default routePaths;
