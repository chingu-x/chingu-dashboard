import {
  ComputerDesktopIcon,
  SwatchIcon,
  CodeBracketSquareIcon,
  ChartPieIcon,
  CloudIcon,
  ServerStackIcon,
} from "@heroicons/react/24/solid";
import type { ComponentType } from "react";
import { addDays, subDays, format } from "date-fns";

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

export type SprintData = {
  number: number;
  startDate: Date;
  endDate: Date;
  eventList?: Event[];
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

export const getMeetingsData = (): Event[] => [
  {
    title: "Sprint Planning",
    link: "https://www.agileway.it/sprint-planning-meeting/",
    date: format(new Date(), "yyyy-MM-dd h:mm a"),
  },
  {
    title: "Sprint Review",
    link: "https://www.nuclino.com/articles/sprint-review#:~:text=A%20sprint%20review%20is%20an,than%20a%20one%2Dsided%20presentation.",
    date: format(subDays(new Date(), 2), "yyyy-MM-dd h:mm a"),
  },
];
export const getSprintData = (): SprintData => ({
  number: 1,
  startDate: subDays(new Date(), 3),
  endDate: addDays(new Date(), 1),
  eventList: getMeetingsData(),
});
