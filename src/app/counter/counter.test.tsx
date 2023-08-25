import { render } from "@testing-library/react";
import CounterPage from "./page";
import { StoreProvider } from "@/components";
it("should render the component", () => {
  render(
    <StoreProvider>
      <CounterPage />
    </StoreProvider>,
  );
});
