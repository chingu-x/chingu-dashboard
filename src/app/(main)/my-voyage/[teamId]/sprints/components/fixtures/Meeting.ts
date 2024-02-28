export interface Topic {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

export interface Meeting {
  id: number;
  sprint: {
    id: number;
    number: number;
    startDate: string;
    endDate: string;
  };
  title: string;
  dateTime: string;
  meetingLink: string;
  notes: string;
  agendas: Topic[];
}

export const meetingInfo: Meeting = {
  id: 1,
  sprint: {
    id: 1,
    number: 1,
    startDate: "2023-11-06T00:00:00.000Z",
    endDate: "2023-11-12T00:00:00.000Z",
  },
  title: "First sprint kickoff meeting",
  dateTime: "2023-11-07T00:00:00.000Z",
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

export const topicsData: Topic[] = [
  {
    id: 0,
    title: "Milestones for this week",
    description:
      "FE Team - make homepage responsive\nBE Team - create endpoints for user profile\nDE Team - user flow for the modals",
    status: true,
  },
  {
    id: 1,
    title: "FE Team",
    description: "PR pushed this week\nModal\nComponentsHomepage",
    status: true,
  },
  {
    id: 2,
    title: "BE Team",
    description:
      "Endpoints created this week\nHomepage\nUser profile\nSettings",
    status: true,
  },
  {
    id: 3,
    title: "Project Management Tools",
    description:
      "Walk the team through how the Jira board is organized and how we will coordinate communications and tickets.",
    status: false,
  },
];
