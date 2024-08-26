import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { format } from "date-fns";
import Calendar from "./Calendar";
import { rootReducer } from "@/store/store";

describe("Calendar Component", () => {
  // not the best test. maybe refactor to e2e test later
  it("displays the month and year on a single line", () => {
    const store = configureStore({
      reducer: rootReducer,
    });

    const { getByText } = render(
      <Provider store={store}>
        <Calendar />
      </Provider>,
    );

    const currentDate = new Date();
    const formattedDate = format(currentDate, "MMMM y");
    const monthYearElement = getByText(formattedDate);

    expect(monthYearElement.closest("div")).toHaveClass("whitespace-nowrap");
  });
});
