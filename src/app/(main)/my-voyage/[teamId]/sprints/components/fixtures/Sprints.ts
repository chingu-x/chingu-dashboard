export interface Sprint {
  id: number;
  number: number;
  startDate: string;
  endDate: string;
  teamMeetings: { meetingId: number }[];
}

export const sprints: Sprint[] = [
  {
    id: 1,
    number: 1,
    startDate: "2023-11-06T00:00:00.000Z",
    endDate: "2023-11-12T00:00:00.000Z",
    teamMeetings: [{ meetingId: 1 }],
  },
  {
    id: 2,
    number: 2,
    startDate: "2023-11-13T00:00:00.000Z",
    endDate: "2023-11-19T00:00:00.000Z",
    teamMeetings: [{ meetingId: 2 }],
  },
  {
    id: 3,
    number: 3,
    startDate: "2023-11-20T00:00:00.000Z",
    endDate: "2023-11-26T00:00:00.000Z",
    teamMeetings: [{ meetingId: 3 }],
  },
  {
    id: 4,
    number: 4,
    startDate: "2023-11-27T00:00:00.000Z",
    endDate: "2023-12-03T00:00:00.000Z",
    teamMeetings: [{ meetingId: 4 }],
  },
  {
    id: 5,
    number: 5,
    startDate: "2023-12-04T00:00:00.000Z",
    endDate: "2023-12-10T00:00:00.000Z",
    teamMeetings: [{ meetingId: 5 }],
  },
  {
    id: 6,
    number: 6,
    startDate: "2023-12-11T00:00:00.000Z",
    endDate: "2023-12-17T00:00:00.000Z",
    teamMeetings: [{ meetingId: 6 }],
  },
];
