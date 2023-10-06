import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, useTheme } from "next-themes";
import { ModeToggle } from "@/components";

function WrapperComponent({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: string;
}) {
  return (
    <ThemeProvider
      defaultTheme={theme}
      enableSystem={false}
      storageKey="chingu-theme"
    >
      {children}
    </ThemeProvider>
  );
}

//////////////////////////////////////////////////////////
// Test mode toggle using a spy
function ModeSpy() {
  const { theme } = useTheme();
  return <span data-testid="mode-spy">{theme}</span>;
}

describe("Mode Toggle", () => {
  let localStorageMock: { [key: string]: string } = {};

  beforeAll(() => {
    // Create a mock of the window.matchMedia function
    global.matchMedia = jest.fn((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    // Create mocks of localStorage getItem and setItem functions
    global.Storage.prototype.getItem = jest.fn(
      (key: string) => localStorageMock[key],
    );
    global.Storage.prototype.setItem = jest.fn((key: string, value: string) => {
      localStorageMock[key] = value;
    });
  });

  beforeEach(() => {
    // Clear the localStorage-mock
    localStorageMock = {};
  });

  it("should set the theme to light when defaultTheme is set to light", () => {
    render(
      <WrapperComponent theme="light">
        <ModeToggle />
        <ModeSpy />
      </WrapperComponent>,
    );
    const checkbox = screen.getByTestId("mode-toggle");
    const spy = screen.getByTestId("mode-spy");

    expect(checkbox).toBeChecked();
    expect(spy).toHaveTextContent("light");
  });

  it("should set the theme to dark when defaultTheme is set to dark", () => {
    render(
      <WrapperComponent theme="dark">
        <ModeToggle />
        <ModeSpy />
      </WrapperComponent>,
    );
    const checkbox = screen.getByTestId("mode-toggle");
    const spy = screen.getByTestId("mode-spy");

    expect(checkbox).not.toBeChecked();
    expect(spy).toHaveTextContent("dark");
  });

  it("should change the theme to dark when clicking", () => {
    render(
      <WrapperComponent theme="light">
        <ModeToggle />
        <ModeSpy />
      </WrapperComponent>,
    );
    const checkbox = screen.getByTestId("mode-toggle");
    const spy = screen.getByTestId("mode-spy");

    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(spy).toHaveTextContent("dark");
  });

  it("should change the theme back to light when clicking twice", () => {
    render(
      <WrapperComponent theme="light">
        <ModeToggle />
        <ModeSpy />
      </WrapperComponent>,
    );
    const checkbox = screen.getByTestId("mode-toggle");
    const spy = screen.getByTestId("mode-spy");

    fireEvent.doubleClick(checkbox);

    expect(checkbox).toBeChecked();
    expect(spy).toHaveTextContent("light");
  });
});
