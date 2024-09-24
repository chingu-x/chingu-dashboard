import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { rootReducer } from "@/store/store";
import { useUser } from "@/store/hooks";
import { teamMemberData } from "../fixtures/TeamMember";
import { type VoyageTeam } from "@/store/features/directory/directorySlice";
import TeamMember from "@/app/(main)/my-voyage/[teamId]/directory/components/TeamMember";

jest.mock("@/store/hooks", () => ({
  useUser: jest.fn(),
}));

jest.mock(
  "@/app/(main)/my-voyage/[teamId]/directory/components/EditHours",
  () =>
    function EditHoursMock() {
      return (
        <div>
          <button type="button">average hour per sprint</button>
        </div>
      );
    },
);

const renderWithStore = (teamMember: VoyageTeam, userId: number) => {
  const store = configureStore({
    reducer: rootReducer,
  });

  (useUser as jest.Mock).mockReturnValue({
    voyageTeamMembers: [{ id: userId }],
  });

  return render(
    <Provider store={store}>
      <TeamMember teamMember={teamMember} />
    </Provider>,
  );
};

describe("Team Member Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders individual team data", () => {
    const teamMember = renderWithStore(teamMemberData, 20);

    const name = teamMember.getByLabelText("Name");
    const discordID = teamMember.getByLabelText("Discord ID");
    const timezone = teamMember.getByLabelText("Timezone");
    const position = teamMember.getByLabelText("Position");
    const avgHrPerSprint = teamMember.getByLabelText("Average Hour/Sprint");

    expect(name).toBeInTheDocument();
    expect(discordID).toBeInTheDocument();
    expect(timezone).toBeInTheDocument();
    expect(position).toBeInTheDocument();
    expect(avgHrPerSprint).toBeInTheDocument();
  });

  it("current user CANNOT input other id's average hour per sprint", () => {
    const screen = renderWithStore(teamMemberData, 30);

    screen.debug();

    const buttonAction = screen.queryByRole("button", {
      name: "average hour per sprint",
    });

    expect(buttonAction).not.toBeInTheDocument();
  });

  it("current user can input their own id's average hour per sprint", () => {
    const screen = renderWithStore(teamMemberData, 20);

    screen.debug();

    const buttonAction = screen.queryByRole("button", {
      name: "average hour per sprint",
    });

    expect(buttonAction).toBeInTheDocument();
  });
});
