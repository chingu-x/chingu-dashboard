export const CHECKIN_STATUS = "Due today";

export type IdeationData = {
  title: string;
  topic: string;
  description: string;
};

export const getIdeationData = (): IdeationData => ({
  title: "Real Estate crowdsourcing",
  topic: "Project Idea",
  description: `A real estate crowdsourcing application is a platform that allows
  individuals to invest in real estate properties without needing to
  purchase entire properties themselves. Through the application,
  investors can pool their money together to fund a real estate project,
  and then receive a portion of the profits once the project is
  complete. The platform typically offers a range of real estate
  projects for investors to choose from, and provides tools to help
  investors track their investments and receive regular updates on the
  progress of each project.`,
});

export const getFeaturesData = (): string[] => [
  "User Registration",
  "User Login",
  "Estate Listing",
  "Property Search",
  "Items search",
  "User Registration",
  "User Login",
  "Estate Listing",
  "Property Search",
  "Items search",
];
