import {
  getFeaturesData,
  getIdeationData,
  getResourcesData,
  getSprintData,
  getTechStackData,
} from "@/app/(main)/dashboard/mocks/voyageDashboardData";

const useVoyageDashboardLogic = (filledState: boolean) => {
  const ideationData = filledState ? getIdeationData() : null;
  const featureData = filledState ? getFeaturesData() : null;
  const techStackData = filledState ? getTechStackData() : null;
  const resourceData = filledState ? getResourcesData() : null;
  const sprintData = filledState ? getSprintData() : null;

  return {
    ideationData,
    featureData,
    techStackData,
    resourceData,
    sprintData,
  };
};

export default useVoyageDashboardLogic;
