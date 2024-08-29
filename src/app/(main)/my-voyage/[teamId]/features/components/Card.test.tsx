import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import React from "react";
import Card from "./Card";
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

describe("Feature Card component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders edit button if current user's id matches id of user who added feature", () => {
    const mockSetEditMode = jest.fn();

    const store = configureStore({
      reducer: rootReducer,
    });

    const feature = {
      id: 1,
      order: 1,
      teamMemberId: 1,
      category: {
        id: 1,
        name: "Must Have",
      },
      addedBy: {
        member: {
          id: "user1",
          firstName: "test",
          lastName: "user",
          avatar:
            "https://gravatar.com/avatar/c8cf6521c193fc743c7fadcd8be04e983724764efa65b3c3913b6d22f086a11f?s=200&r=g&d=robohash",
        },
      },
      description:
        "This is a really long description to test ellipsis button visibility",
    };

    (useUser as jest.Mock).mockReturnValue({ id: "user1" });

    const card = render(
      <Provider store={store}>
        <Card index={1} feature={feature} setEditMode={mockSetEditMode} />
      </Provider>,
    );

    const editButton = card.getByRole("button", { name: /feature menu/i });
    const avatar = card.queryByRole("img", { name: /avatar/i });

    expect(editButton).toBeInTheDocument();
    expect(avatar).not.toBeInTheDocument();
  });

  it("renders avatar if current user's id doesn't match id of user who added feature", () => {
    const mockSetEditMode = jest.fn();

    const store = configureStore({
      reducer: rootReducer,
    });

    const feature = {
      id: 1,
      order: 1,
      teamMemberId: 1,
      category: {
        id: 1,
        name: "Must Have",
      },
      addedBy: {
        member: {
          id: "user1",
          firstName: "test",
          lastName: "user",
          avatar:
            "https://gravatar.com/avatar/c8cf6521c193fc743c7fadcd8be04e983724764efa65b3c3913b6d22f086a11f?s=200&r=g&d=robohash",
        },
      },
      description:
        "This is a really long description to test ellipsis button visibility",
    };

    (useUser as jest.Mock).mockReturnValue({ id: "user2" });

    const card = render(
      <Provider store={store}>
        <Card index={1} feature={feature} setEditMode={mockSetEditMode} />
      </Provider>,
    );

    const editButton = card.queryByRole("button", { name: /feature menu/i });
    const avatar = card.getByRole("img", { name: /avatar/i });

    expect(editButton).not.toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
  });

  it("wraps long word to new line", () => {
    const mockSetEditMode = jest.fn();

    const store = configureStore({
      reducer: rootReducer,
    });

    const feature = {
      id: 1,
      order: 1,
      teamMemberId: 1,
      category: {
        id: 1,
        name: "Must Have",
      },
      addedBy: {
        member: {
          id: "user1",
          firstName: "test",
          lastName: "user",
          avatar:
            "https://gravatar.com/avatar/c8cf6521c193fc743c7fadcd8be04e983724764efa65b3c3913b6d22f086a11f?s=200&r=g&d=robohash",
        },
      },
      description:
        "This is a really long description to test ellipsis button visibility",
    };

    (useUser as jest.Mock).mockReturnValue({ id: "user2" });

    const card = render(
      <Provider store={store}>
        <Card index={1} feature={feature} setEditMode={mockSetEditMode} />
      </Provider>,
    );

    const description = card.getByText(feature.description);
    expect(description.closest("span")).toHaveClass("break-all");
  });
});
