import { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { rootReducer } from "@/store/store";
import { useUser } from "@/store/hooks";
import { teamMemberData } from "@/app/(main)/my-voyage/[teamId]/directory/components/fixtures/TeamMember";
import TeamMember from "@/app/(main)/my-voyage/[teamId]/directory/components/TeamMember";
import TextInput from "@/components/inputs/TextInput";
import Button from "@/components/Button";

jest.mock("@/store/hooks", () => ({
  useUser: jest.fn(),
}));

jest.mock(
  "@/app/(main)/my-voyage/[teamId]/directory/components/EditHours",
  () =>
    function EditHoursMock() {
      const [isEditing, setIsEditing] = useState(false);

      return isEditing ? (
        <TextInput
          placeholder={`${teamMemberData.hrPerSprint}`}
          defaultValue={`${teamMemberData.hrPerSprint}`}
          id="avgHours"
        />
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          aria-label="average hour per sprint"
        >
          {`${teamMemberData.hrPerSprint}`}
        </Button>
      );
    },
);

const renderWithStore = (userId: number) => {
  const store = configureStore({
    reducer: rootReducer,
  });

  (useUser as jest.Mock).mockReturnValue({
    voyageTeamMembers: [{ id: userId }],
  });

  return render(
    <Provider store={store}>
      <TeamMember teamMember={teamMemberData} />
    </Provider>,
  );
};

describe("Edit Hours Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("current user has a button to edit their hours", () => {
    const screen = renderWithStore(20);

    screen.debug();

    const buttonAction = screen.queryByRole("button", {
      name: "average hour per sprint",
    });

    expect(buttonAction).toBeInTheDocument();
  });

  it("current user can edit their hours", () => {
    const screen = renderWithStore(20);

    const buttonAction = screen.getByRole("button", {
      name: "average hour per sprint",
    });

    fireEvent.click(buttonAction);

    const textInputAction = screen.getByPlaceholderText("10");

    // assert that the button is a textInput
    expect(textInputAction).toBeInTheDocument();

    fireEvent.change(textInputAction, { target: { value: "15" } });

    // Assert that the input is edited to a new value
    expect((textInputAction as HTMLInputElement).value).toBe("15");
  });
});
