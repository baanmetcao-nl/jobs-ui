import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ApplyModal from "@/app/apply-modal";

// framer-motion and radix portal need minimal mocking for jsdom
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Suppress the Radix "Missing Description" warning — the production component
// uses VisuallyHidden for the title; a description is intentionally omitted.
beforeEach(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => {
  jest.restoreAllMocks();
});

describe("ApplyModal", () => {
  it("renders the warning heading", () => {
    render(<ApplyModal onAccept={jest.fn()} onClose={jest.fn()} />);
    expect(screen.getByText("Let op:")).toBeInTheDocument();
  });

  it("renders the redirect warning message", () => {
    render(<ApplyModal onAccept={jest.fn()} onClose={jest.fn()} />);
    expect(
      screen.getByText(/Je staat op het punt om de website/)
    ).toBeInTheDocument();
  });

  it("renders Cancel and Apply buttons", () => {
    render(<ApplyModal onAccept={jest.fn()} onClose={jest.fn()} />);
    expect(screen.getByText("Annuleer")).toBeInTheDocument();
    expect(screen.getByText("Solliciteer")).toBeInTheDocument();
  });

  it("calls onClose when the Cancel button is clicked", () => {
    const onClose = jest.fn();
    render(<ApplyModal onAccept={jest.fn()} onClose={onClose} />);
    fireEvent.click(screen.getByText("Annuleer"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onAccept when the Apply button is clicked", () => {
    const onAccept = jest.fn();
    render(<ApplyModal onAccept={onAccept} onClose={jest.fn()} />);
    fireEvent.click(screen.getByText("Solliciteer"));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  it("does not call onAccept when Cancel is clicked", () => {
    const onAccept = jest.fn();
    render(<ApplyModal onAccept={onAccept} onClose={jest.fn()} />);
    fireEvent.click(screen.getByText("Annuleer"));
    expect(onAccept).not.toHaveBeenCalled();
  });
});
