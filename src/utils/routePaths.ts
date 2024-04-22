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
  finalizeIdeationPage(teamId: string) {
    return `/my-voyage/${teamId}/ideation/finalize`;
  },
  featuresPage(teamId: string) {
    return `/my-voyage/${teamId}/features`;
  },
  sprintsPage(teamId: string) {
    return `/my-voyage/${teamId}/sprints`;
  },
  emptySprintPage(teamId: string, sprintNumber: string) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}`;
  },
  sprintWeekPage(teamId: string, sprintNumber: string, meetingId: string) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}/meeting/${meetingId}`;
  },
  submitVoyagePage(teamId: string) {
    return `/my-voyage/${teamId}/sprints/voyage-submission`;
  },
  weeklyCheckInPage(teamId: string) {
    return `/my-voyage/${teamId}/sprints/weekly-checkin`;
  },
  createMeetingPage(teamId: string, sprintNumber: string) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}/create`;
  },
  editMeetingPage(teamId: string, sprintNumber: string, meetingId: string) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}/meeting/${meetingId}/edit`;
  },
  addTopicPage(teamId: string) {
    return `/my-voyage/${teamId}/sprints/add-topic`;
  },
  voyageResourcesPage(teamId: string) {
    return `/my-voyage/${teamId}/voyage-resources`;
  },
};

export default routePaths;
