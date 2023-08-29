import React from "react";

interface TeamMember {
  name: string;
  discordId: string;
  averageHour: number;
  location: string;
  timeZone: string;
  email: string;
  position: string;
}

interface TeamRowProps {
  teamMemeber: TeamMember;
}

function TeamRow({ teamMemeber }: TeamRowProps) {
  return (
    <tr>
      <td className="text-[#000000]">{teamMemeber.name}</td>
      <td>{teamMemeber.discordId}</td>
      <td>{teamMemeber.averageHour}</td>
      <td>{teamMemeber.location}</td>
      <td>{teamMemeber.timeZone}</td>
      <td>{teamMemeber.email}</td>
      <td>{teamMemeber.position}</td>
    </tr>
  );
}

export default TeamRow;
