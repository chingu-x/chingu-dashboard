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
  emptySprintPage(teamId: string, sprintNumber: string) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}`;
  },
  sprintPage(teamId: string, sprintNumber: string, meetingId: string) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}/meeting/${meetingId}`;
  },
  submitVoyage(teamId: string, sprintNumber: string, meetingId: string) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}/meeting/${meetingId}/submit-voyage`;
  },
  weeklyCheckIn(teamId: string, sprintNumber: string, meetingId: string) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}/meeting/${meetingId}/submit-check-in`;
  },
  createMeeting(teamId: string, sprintNumber: string) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}/meeting/create`;
  },
  editMeeting(teamId: string, sprintNumber: string, meetingId: string) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}/meeting/${meetingId}/edit`;
  },
  addTopic(teamId: string, sprintNumber: string, meetingId: string) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}/meeting/${meetingId}/agendas/add`;
  },
  editTopic(
    teamId: string,
    sprintNumber: string,
    meetingId: string,
    agendaId: string,
  ) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}/meeting/${meetingId}/agendas/${agendaId}/edit`;
  },
  voyageResourcesPage(teamId: string) {
    return `/my-voyage/${teamId}/voyage-resources`;
  },
};

export default routePaths;
