export interface TeamMember {
  member: {
    id: string;
    firstName: string;
    lastName: string;
    discordId: string;
    timezone: string;
  };
  hrPerSprint: number;
  voyageRole: { name: string };
}

export const teamMembers: TeamMember[] = [
  {
    member: {
      id: "1",
      firstName: "Danney",
      lastName: "Trieu",
      discordId: "danneytrieuwork#2558",
      timezone: "America/Los_Angeles",
    },
    hrPerSprint: 12,
    voyageRole: { name: "Product Owner" },
  },
  {
    member: {
      id: "2",
      firstName: "Jane",
      lastName: "Morez",
      discordId: "Jan_morez#2341",
      timezone: "Europe/Zurich",
    },
    hrPerSprint: 9,
    voyageRole: { name: "Back-end Developer" },
  },

  {
    member: {
      id: "3",
      firstName: "Kayla",
      lastName: "Montre",
      discordId: "KaylaMon#5678",
      timezone: "Asia/Dubai",
    },
    hrPerSprint: 12,
    voyageRole: { name: "UX/UI Designer" },
  },

  {
    member: {
      id: "4",
      firstName: "Jackson",
      lastName: "Pez",
      discordId: "jackson#2558",
      timezone: "America/Mexico_City",
    },
    hrPerSprint: 12,
    voyageRole: { name: "Front-end Developer" },
  },
];
