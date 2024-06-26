import {
  ComputerDesktopIcon,
  SwatchIcon,
  CodeBracketSquareIcon,
  ChartPieIcon,
  CloudIcon,
  ServerStackIcon,
} from "@heroicons/react/24/solid";
import type { ComponentType } from "react";

export const CHECKIN_STATUS = "Due today";

export type IdeationData = {
  title: string;
  topic: string;
  description: string;
};

export type TechStackData = {
  title: string;
  icon: ComponentType;
  value: string;
};

export type ResourcesData = {
  title: string;
  userName: string;
  resourceUrl: string;
  userImage?: string;
};

export type Event = {
  title: string;
  link: string;
  date: string;
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
];

export const getTechStackData = (): TechStackData[] => [
  {
    title: "Frontend",
    icon: ComputerDesktopIcon,
    value: "React",
  },
  {
    title: "CSS Library",
    icon: SwatchIcon,
    value: "TailwindCSS",
  },
  {
    title: "Backend",
    icon: CodeBracketSquareIcon,
    value: "NodeJs",
  },
  {
    title: "Project Management",
    icon: ChartPieIcon,
    value: "Jira",
  },
  {
    title: "Cloud Provider",
    icon: CloudIcon,
    value: "AWS",
  },
  {
    title: "Hosting",
    icon: ServerStackIcon,
    value: "Render",
  },
];

export const getResourcesData = (): ResourcesData[] => [
  {
    title: "What is Agile",
    userName: "Jonathon Doe",
    resourceUrl: "https://www.atlassian.com/agile",
  },
  {
    title: "The 5 Best Practices for Writing Clean Code",
    userName: "Mark Red",
    resourceUrl:
      "https://dev.to/favourmark05/writing-clean-code-best-practices-and-principles-3amh",
  },
  {
    title:
      "The Future of Programming Languages: What to Watch for in the Coming Years",
    userName: "David Jackson",
    resourceUrl:
      "https://www.flowmatters.com/blog/the-future-of-programming-languages-what-to-expect-in-the-next-10-years/",
  },
];
