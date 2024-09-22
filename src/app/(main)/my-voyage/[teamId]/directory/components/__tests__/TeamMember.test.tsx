import { render, screen, cleanup } from "@testing-library/react";
import TeamMember from "../TeamMember";

const teamMemberData = {
  hrPerSprint: 20,
  id: 18,
  member: {
    avatar:
      "https://gravatar.com/avatar/bf43e9e807d7af993856490ba4c30825e951eceea84daee58288300faa56fc23?s=200&r=g&d=robohash\n",
    countryCode: "US",
    currentTime: "11:59 (PDT)",
    firstName: "Leonarda",
    lastName: "Rowe",
    timezone: "America/Los_Angeles",
    oAuthProfiles: [],
  },
  voyageRole: {
    name: "Developer",
  },
};

describe("Team Member Component", () => {
  it("renders individual team data", () => {
    render(<TeamMember teamMember={teamMemberData} />);
  });
});
