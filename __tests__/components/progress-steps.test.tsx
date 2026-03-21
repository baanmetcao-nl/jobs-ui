import React from "react";
import { render, screen } from "@testing-library/react";
import {
  ProgressSteps,
  ProgressStepsCompact,
} from "@/components/progress-steps";

const steps = [
  { id: 1, title: "Vacature", description: "Functiegegevens" },
  { id: 2, title: "Bedrijf", description: "Bedrijfsinformatie" },
  { id: 3, title: "Preview", description: "Bekijk vacature" },
];

describe("ProgressSteps", () => {
  it("renders all step titles", () => {
    render(<ProgressSteps steps={steps} currentStep={1} />);
    expect(screen.getAllByText("Vacature").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Bedrijf").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Preview").length).toBeGreaterThan(0);
  });

  it("renders step descriptions", () => {
    render(<ProgressSteps steps={steps} currentStep={1} />);
    expect(screen.getByText("Functiegegevens")).toBeInTheDocument();
    expect(screen.getByText("Bedrijfsinformatie")).toBeInTheDocument();
  });

  it("shows step numbers for incomplete steps", () => {
    render(<ProgressSteps steps={steps} currentStep={1} />);
    // Steps 2 and 3 are upcoming — their step numbers should appear
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders a checkmark for completed steps (step id < currentStep)", () => {
    // With currentStep=3, steps 1 and 2 are completed
    render(<ProgressSteps steps={steps} currentStep={3} />);
    // lucide Check icons are rendered as SVGs; the step numbers should NOT appear
    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.queryByText("2")).not.toBeInTheDocument();
  });

  it("shows the mobile progress label", () => {
    render(<ProgressSteps steps={steps} currentStep={2} />);
    expect(screen.getByText("Stap 2 van 3")).toBeInTheDocument();
  });

  it("shows the correct percentage in the mobile view", () => {
    render(<ProgressSteps steps={steps} currentStep={2} />);
    // 2/3 * 100 = 66.67% → Math.round = 67%
    expect(screen.getByText("67%")).toBeInTheDocument();
  });

  it("shows 100% when on the last step", () => {
    render(<ProgressSteps steps={steps} currentStep={3} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("applies the provided className", () => {
    const { container } = render(
      <ProgressSteps
        steps={steps}
        currentStep={1}
        className="my-custom-class"
      />,
    );
    expect(container.firstChild).toHaveClass("my-custom-class");
  });
});

describe("ProgressStepsCompact", () => {
  it("renders a dot for each step", () => {
    const { container } = render(
      <ProgressStepsCompact steps={steps} currentStep={1} />,
    );
    // Each step renders a div with a step number or check icon
    expect(container.querySelectorAll(".rounded-full")).toHaveLength(3);
  });

  it("shows the step id for non-completed steps", () => {
    render(<ProgressStepsCompact steps={steps} currentStep={1} />);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("does not show the step id for completed steps", () => {
    render(<ProgressStepsCompact steps={steps} currentStep={3} />);
    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.queryByText("2")).not.toBeInTheDocument();
  });
});
