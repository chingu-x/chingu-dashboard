import { addWeeks, subWeeks } from "date-fns";

export interface TeamMeating {
  id: number;
}

export interface Sprint {
  id: number;
  number: number;
  startDate: string;
  endDate: string;
  teamMeetings: TeamMeating[];
}

const currentDateTime = new Date();

export const mockSprintsData: Sprint[] = [
  {
    id: 1,
    number: 1,
    startDate: `${subWeeks(currentDateTime, 1).toISOString()}`,
    endDate: `${subWeeks(currentDateTime, 3).toISOString()}`,
    teamMeetings: [{ id: 1 }],
  },
  {
    id: 2,
    number: 2,
    startDate: `${subWeeks(currentDateTime, 2).toISOString()}`,
    endDate: `${subWeeks(currentDateTime, 1).toISOString()}`,
    teamMeetings: [{ id: 2 }],
  },
  {
    id: 3,
    number: 3,
    startDate: `${currentDateTime.toISOString()}`,
    endDate: `${addWeeks(currentDateTime, 1).toISOString()}`,
    teamMeetings: [{ id: 3 }],
  },
  {
    id: 4,
    number: 4,
    startDate: `${addWeeks(currentDateTime, 2).toISOString()}`,
    endDate: `${addWeeks(currentDateTime, 3).toISOString()}`,
    teamMeetings: [{ id: 4 }],
  },
  {
    id: 5,
    number: 5,
    startDate: `${addWeeks(currentDateTime, 4).toISOString()}`,
    endDate: `${addWeeks(currentDateTime, 5).toISOString()}`,
    teamMeetings: [{ id: 5 }],
  },
  {
    id: 6,
    number: 6,
    startDate: `${addWeeks(currentDateTime, 42).toISOString()}`,
    endDate: `${addWeeks(currentDateTime, 49).toISOString()}`,
    teamMeetings: [{ id: 6 }],
  },
];
