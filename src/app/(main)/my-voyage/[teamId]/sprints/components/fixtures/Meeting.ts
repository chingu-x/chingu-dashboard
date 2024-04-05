import { addDays } from "date-fns";

export interface Sprint {
  id: number;
  number: number;
}

export interface Agenda {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

export interface Meeting {
  id: number;
  sprint: Sprint;
  title: string;
  dateTime: string;
  meetingLink: string;
  notes: string;
  agendas: Agenda[];
}

const currentDateTime = new Date();

export const mockMeetingData: Meeting = {
  id: 3,
  sprint: {
    id: 3,
    number: 3,
  },
  title: "First sprint kickoff meeting",
  dateTime: `${addDays(currentDateTime, 3).toISOString()}`,
  meetingLink: "meet.google.com/abcdefg",
  notes:
    "Title\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis.",
  agendas: [
    {
      id: 1,
      title: "Project Management Tools",
      description:
        "Walk the team through how the Jira board is organized and how we will coordinate communications and tickets.",
      status: false,
    },
    {
      id: 2,
      title: "Milestone for this week",
      description:
        "FE Team - make homepage responsive\nBE Team - create endpoints for user profile\nDE Team - user flow for the modals",
      status: false,
    },
    {
      id: 3,
      title: "FE Team",
      description:
        "Title\nPR pushed this week\n- Modals\n- Components\n- Homepage",
      status: false,
    },
    {
      id: 4,
      title: "BE Team",
      description:
        "Title\nEndpoints created this week\n- Homepage\n- User profile\n- Settings",
      status: false,
    },
  ],
};

// TODO: DELETE
export const topicsData: Agenda[] = [
  {
    id: 0,
    title: "Milestones for this week",
    description:
      "FE Team - make homepage responsive\nBE Team - create endpoints for user profile\nDE Team - user flow for the modals",
    status: false,
  },
  {
    id: 1,
    title: "FE Team",
    description: "PR pushed this week:\nModal\nComponents Homepage",
    status: false,
  },
  {
    id: 2,
    title: "BE Team",
    description:
      "Endpoints created this week:\nHomepage\nUser profile\nSettings",
    status: false,
  },
  {
    id: 3,
    title: "Project Management Tools",
    description:
      "Walk the team through how the Jira board is organized and how we will coordinate communications and tickets.",
    status: true,
  },
];
