import "./TeamTable.css";

import { TeamRow } from ".";

const data = [
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

function TeamTable() {
  return (
    <div className="overflow-x-auto">
      <table className="table bg-[#C4DED2] px-6 py-7">
        {/* head */}
        <thead className="text-xl font-semibold text-[#000000]">
          <tr>
            <th>Name</th>
            <th>Discord ID</th>
            <th>Average Hour/Sprint</th>
            <th>Location</th>
            <th>Time Zone</th>
            <th>Email</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody className="text-base font-medium text-[#757575]">
          {/* rows */}
          {data.map((teamMemeber) => (
            <TeamRow key={teamMemeber.id} teamMemeber={teamMemeber} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamTable;
