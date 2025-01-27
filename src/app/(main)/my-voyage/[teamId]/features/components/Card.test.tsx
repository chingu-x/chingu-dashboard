import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import React from "react";
import Card from "./Card";
import { type Feature, features } from "./fixtures/Features";
import { rootReducer } from "@/store/store";
import { useUser } from "@/store/hooks";

jest.mock("./EditPopover", () => <div>mock child component</div>);
jest.mock("@/store/hooks", () => ({
  useUser: jest.fn(),
}));
jest.mock("@hello-pangea/dnd", () => ({
  DragDropContext: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Droppable: ({
    children,
  }: {
    children: (provided: {
      droppableProps: Record<string, unknown>;
      innerRef: React.RefObject<HTMLDivElement>;
    }) => React.ReactNode;
  }) => (
    <div>
      {children({
        droppableProps: {},
        innerRef: React.createRef<HTMLDivElement>(),
      })}
    </div>
  ),
  Draggable: ({
    children,
  }: {
    children: (provided: {
      draggableProps: Record<string, unknown>;
      dragHandleProps: Record<string, unknown>;
      innerRef: React.RefObject<HTMLDivElement>;
    }) => React.ReactNode;
  }) => (
    <div>
      {children({
        draggableProps: {},
        dragHandleProps: {},
        innerRef: React.createRef<HTMLDivElement>(),
      })}
    </div>
  ),
}));
jest.mock("@chingu-x/components/avatar", () => ({
  Avatar: jest.fn(() => <div>Mocked Avatar</div>),
}));

// "current user" id is 25b7b76c-1567-4910-9d50-e78819daccf1
const renderWithStore = (feature: Feature, userId: string) => {
  const store = configureStore({
    reducer: rootReducer,
  });

  (useUser as jest.Mock).mockReturnValue({ id: userId });

  return render(
    <Provider store={store}>
      <Card index={1} feature={feature} setEditMode={jest.fn()} />
    </Provider>,
  );
};

describe("Feature Card component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders edit button if current user's id matches id of user who added feature", () => {
    const card = renderWithStore(
      features[0],
      "25b7b76c-1567-4910-9d50-e78819daccf1",
    );

    const cardAction = card.getByRole("button", { name: /feature menu/i });
    const avatar = card.queryByText("Mocked Avatar");

    expect(cardAction).toBeInTheDocument();
    expect(avatar).not.toBeInTheDocument();
  });

  it("renders avatar if current user's id doesn't match id of user who added feature", () => {
    const card = renderWithStore(
      features[0],
      "5d6eb1aa-6e9c-4b26-a363-6a35e5d76daa",
    );

    const cardAction = card.queryByRole("button", { name: /feature menu/i });
    const avatar = card.queryByText("Mocked Avatar");

    expect(cardAction).not.toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
  });

  it("wraps long word to new line", () => {
    const card = renderWithStore(
      features[0],
      "5d6eb1aa-6e9c-4b26-a363-6a35e5d76daa",
    );

    const description = card.getByText(features[0].description);
    expect(description.closest("span")).toHaveClass("break-all");
  });
});
