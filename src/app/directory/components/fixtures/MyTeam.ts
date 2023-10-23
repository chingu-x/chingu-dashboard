export interface TeamMember {
  member: {
    firstName: string;
    lastName: string;
    avatar: string;
    discordId: string;
    countryCode: string;
    timezone: string;
    email: string;
  };
  hrPerSprint: number;
  voyageRole: { name: string };
}

export const teamMembers: TeamMember[] = [
  {
    member: {
      firstName: "Danney",
      lastName: "Trieu",
      avatar: "",
      discordId: "danneytrieuwork#2558",
      countryCode: "US",
      timezone: "America/Los_Angeles",
      email: "danney@gmail.com",
    },
    hrPerSprint: 12,
    voyageRole: { name: "Product Owner" },
  },
  {
    member: {
      firstName: "Jane",
      lastName: "Morez",
      avatar: "",
      discordId: "Jan_morez#2341",
      countryCode: "US",
      timezone: "America/Los_Angeles",
      email: "jane@gmail.com",
    },
    hrPerSprint: 9,
    voyageRole: { name: "Back-end Developer" },
  },

  {
    member: {
      firstName: "Kayla",
      lastName: "Montre",
      avatar: "",
      discordId: "KaylaMon#5678",
      countryCode: "US",
      timezone: "America/Las_Vegas",
      email: "kayla@gmail.com",
    },
    hrPerSprint: 12,
    voyageRole: { name: "UX/UI Designer" },
  },

  {
    member: {
      firstName: "Jackson",
      lastName: "Pez",
      avatar: "",
      discordId: "jackson#2558",
      countryCode: "US",
      timezone: "America/Los_Angeles",
      email: "jackson@gmail.com",
    },
    hrPerSprint: 12,
    voyageRole: { name: "Front-end Developer" },
  },
];
