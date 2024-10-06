import { render, screen } from "@testing-library/react";
import Avatar from "@/components/avatar/Avatar";

const imageUrl =
  "https://gravatar.com/avatar/c8cf6521c193fc743c7fadcd8be04e983724764efa65b3c3913b6d22f086a11f?s=200&r=g&d=robohash";

describe("Avatar Component", () => {
  it("renders image correctly", () => {
    render(<Avatar width={24} height={24} image={imageUrl} />);

    const image = screen.getByRole("img", { name: /avatar/i });

    expect(image).toBeInTheDocument();
  });

  it("should have correct image url", () => {
    render(<Avatar width={24} height={24} image={imageUrl} />);

    const image: HTMLImageElement = screen.getByRole("img", {
      name: /avatar/i,
    });

    expect(image.src).toContain(encodeURIComponent(`${imageUrl}&v=1.2`));
  });

  it("handles transparent avatars", () => {
    render(<Avatar width={24} height={24} image={imageUrl} />);

    const image: HTMLImageElement = screen.getByRole("img", {
      name: /avatar/i,
    });

    const hasBgClass = Array.from(image.classList).some((className) =>
      /^bg-.+/.test(className),
    );

    expect(hasBgClass).toBe(true);
  });
});
