import React from "react";
import { render, screen } from "@testing-library/react";
import Pagination from "@/app/pagination";

const mockPathname = "/vacatures";
const mockSearchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
  useSearchParams: () => mockSearchParams,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// jsdom does not implement window.scrollTo
beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe("Pagination", () => {
  beforeEach(() => {
    // Reset search params before each test
    mockSearchParams.forEach((_, key) => mockSearchParams.delete(key));
  });

  it("returns null when totalPages is 1", () => {
    const { container } = render(<Pagination page={0} totalPages={1} />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null when totalPages is 0", () => {
    const { container } = render(<Pagination page={0} totalPages={0} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders page buttons for a small range", () => {
    render(<Pagination page={0} totalPages={3} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("does not render prev/first buttons on the first page", () => {
    render(<Pagination page={0} totalPages={5} />);
    expect(screen.queryByText("<<")).not.toBeInTheDocument();
    expect(screen.queryByText("<")).not.toBeInTheDocument();
  });

  it("renders prev/first buttons when not on the first page", () => {
    render(<Pagination page={2} totalPages={5} />);
    expect(screen.getByText("<<")).toBeInTheDocument();
    expect(screen.getByText("<")).toBeInTheDocument();
  });

  it("does not render next/last buttons on the last page", () => {
    render(<Pagination page={4} totalPages={5} />);
    expect(screen.queryByText(">>")).not.toBeInTheDocument();
    expect(screen.queryByText(">")).not.toBeInTheDocument();
  });

  it("renders next/last buttons when not on the last page", () => {
    render(<Pagination page={0} totalPages={5} />);
    expect(screen.getByText(">")).toBeInTheDocument();
    expect(screen.getByText(">>")).toBeInTheDocument();
  });

  it("renders ellipsis when there are many pages", () => {
    render(<Pagination page={5} totalPages={20} />);
    const ellipses = screen.getAllByText("...");
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it("builds a URL without page param for page 0 (first page)", () => {
    render(<Pagination page={1} totalPages={5} />);
    // The first page link (<<) navigates to page 0 which removes the param
    const firstButton = screen.getByText("<<").closest("a");
    expect(firstButton).toHaveAttribute("href", "/vacatures");
  });

  it("builds a URL with page param for pages > 0", () => {
    render(<Pagination page={0} totalPages={5} />);
    // The ">" button goes to page 1 (index 1) which is displayed as page=2
    const nextButton = screen.getByText(">").closest("a");
    expect(nextButton?.getAttribute("href")).toContain("page=2");
  });

  it("includes existing search params in the generated URL", () => {
    mockSearchParams.set("search", "developer");
    render(<Pagination page={0} totalPages={3} />);
    const nextButton = screen.getByText(">").closest("a");
    expect(nextButton?.getAttribute("href")).toContain("search=developer");
  });
});
