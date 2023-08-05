import { render, screen } from "@testing-library/react";
import CounterPage from "./page";

it("should render the component", () => {
  render(<CounterPage />);

  const button = screen.getByRole("button", { name: "+" });

  expect(button).toBeInTheDocument();
});
