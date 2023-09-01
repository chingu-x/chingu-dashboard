export interface TeamMember {
  id: string;
  name: string;
  discordId: string;
  averageHour: number;
  location: string;
  timeZone: string;
  email: string;
  position: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Danney Trieu",
    discordId: "danneytrieuwork#2558",
    averageHour: 10,
    location: "Denver, CO, USA",
    timeZone: "MDT",
    email: "danney@gmail.com",
    position: "Product Owner",
  },
  {
    id: "2",
    name: "Jane Morez",
    discordId: "Jan_morez#2341",
    averageHour: 15,
    location: "Las Vegas, NY, USA",
    timeZone: "PDT",
    email: "jane@gmail.com",
    position: "Back-end Developer",
  },
  {
    id: "3",
    name: "Kayla Montre",
    discordId: "KaylaMon#5678",
    averageHour: 12,
    location: "Las Vegas, NY, USA",
    timeZone: "PDT",
    email: "kayla@gmail.com",
    position: "UX/UI Designer",
  },
  {
    id: "4",
    name: "Jackson Pez",
    discordId: "jackson#2558",
    averageHour: 10,
    location: "Denver, CO, USA",
    timeZone: "MDT",
    email: "jackson@gmail.com",
    position: "Front-end Developer",
  },
];
