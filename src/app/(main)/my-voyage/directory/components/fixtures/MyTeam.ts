export interface TeamMember {
  id: string;
  name: string;
  discordId: string;
  averageHour: number;
  timeZone: string;
  position: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Danney Trieu",
    discordId: "danneytrieuwork#2558",
    averageHour: 0,
    timeZone: "7:00 (UTC +2)",
    position: "Product Owner",
  },
  {
    id: "2",
    name: "Jane Morez",
    discordId: "Jan_morez#2341",
    averageHour: 0,
    timeZone: "4:00 (UTC +3)",
    position: "Back-end Developer",
  },
  {
    id: "3",
    name: "Kayla Montre",
    discordId: "KaylaMon#5678",
    averageHour: 12,
    timeZone: "6:00 (UTC +4)",
    position: "UX/UI Designer",
  },
  {
    id: "4",
    name: "Jackson Pez",
    discordId: "jackson#2558",
    averageHour: 10,
    timeZone: "14:00 (UTC +11)",
    position: "Front-end Developer",
  },
];
