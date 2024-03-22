import {
  getCalendarData,
  getFeaturesData,
  getIdeationData,
  getResourcesData,
  getSprintData,
  getTechStackData,
} from "./mocks/voyageDashboardData";

const useVoyageDashboardLogic = (filledState: boolean) => {
  const ideationData = filledState ? getIdeationData() : null;
  const featureData = filledState ? getFeaturesData() : null;
  const techStackData = filledState ? getTechStackData() : null;
  const resourceData = filledState ? getResourcesData() : null;
  const calendarData = filledState ? getCalendarData() : null;
  const sprintData = filledState ? getSprintData() : null;

  return {
    ideationData,
    featureData,
    techStackData,
    resourceData,
    calendarData,
    sprintData,
  };
};

export default useVoyageDashboardLogic;
