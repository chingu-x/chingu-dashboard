import {
  getCalendarData,
  getFeaturesData,
  getIdeationData,
  getResourcesData,
  getTechStackData,
} from "./mocks/voyageDashboardData";

const useVoyageDashboardLogic = (filledState: boolean) => {
  const ideationData = filledState ? getIdeationData() : null;
  const featureData = filledState ? getFeaturesData() : null;
  const techStackData = filledState ? getTechStackData() : null;
  const resourceData = filledState ? getResourcesData() : null;
  const calendarData = filledState ? getCalendarData() : null;

  return {
    ideationData,
    featureData,
    techStackData,
    resourceData,
    calendarData,
  };
};

export default useVoyageDashboardLogic;
