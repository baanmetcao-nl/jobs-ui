/* eslint-disable @next/next/no-img-element */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CompanyLogo from "@/components/image-fallback";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    onError,
    width,
    height,
  }: {
    src: string;
    alt: string;
    onError?: () => void;
    width?: number;
    height?: number;
  }) => (
    <img
      src={src}
      alt={alt}
      onError={onError}
      width={width}
      height={height}
      data-testid="company-image"
    />
  ),
}));

describe("CompanyLogo", () => {
  it("renders an image with the provided src", () => {
    render(<CompanyLogo src="https://example.com/logo.png" alt="Acme logo" />);
    expect(screen.getByTestId("company-image")).toHaveAttribute(
      "src",
      "https://example.com/logo.png",
    );
  });

  it("uses the fallback image when no src is provided", () => {
    render(<CompanyLogo alt="Fallback logo" />);
    expect(screen.getByTestId("company-image")).toHaveAttribute(
      "src",
      "/logo-fallback.png",
    );
  });

  it("falls back to the default image on load error", () => {
    render(<CompanyLogo src="https://example.com/broken.png" alt="Broken" />);
    const img = screen.getByTestId("company-image");

    expect(img).toHaveAttribute("src", "https://example.com/broken.png");
    fireEvent.error(img);
    expect(img).toHaveAttribute("src", "/logo-fallback.png");
  });

  it("applies the given size to the container", () => {
    const { container } = render(
      <CompanyLogo src="/logo.png" alt="Logo" size={80} />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ width: "80px", height: "80px" });
  });

  it("defaults to size 60 when size prop is omitted", () => {
    const { container } = render(<CompanyLogo src="/logo.png" alt="Logo" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ width: "60px", height: "60px" });
  });

  it("passes the alt text to the image", () => {
    render(<CompanyLogo src="/logo.png" alt="My Company" />);
    expect(screen.getByAltText("My Company")).toBeInTheDocument();
  });
});
