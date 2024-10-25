// Add all routes being used in the project here

const routePaths = {
  dashboardPage() {
    return "/dashboard";
  },
  VoyageMemberDashboardPage(teamId: string) {
    return `/dashboard/${teamId}`;
  },
  signIn() {
    return "/sign-in";
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
  finalizeTechStackPage(teamId: string) {
    return `/my-voyage/${teamId}/tech-stack/finalize`;
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
  submitVoyagePage(teamId: string, sprintNumber: string) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}/submit-voyage`;
  },
  weeklyCheckInPage(teamId: string, sprintNumber: string) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}/submit-check-in`;
  },
  createMeetingPage(teamId: string, sprintNumber: string) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}/meeting/create`;
  },
  editMeetingPage(teamId: string, sprintNumber: string, meetingId: string) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}/meeting/${meetingId}/edit`;
  },
  addTopicPage(teamId: string, sprintNumber: string, meetingId: string) {
    return `/my-voyage/${teamId}/sprints/${sprintNumber}/meeting/${meetingId}/agendas/add`;
  },
  editTopicPage(
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
