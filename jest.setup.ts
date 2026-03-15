import "@testing-library/jest-dom";

window.scrollTo = jest.fn() as unknown as typeof window.scrollTo;

// Suppress React warnings for Next.js-specific props (e.g. "unoptimized")
// that get passed through to the DOM in the test mock for next/image.
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("for a non-boolean attribute")
  ) {
    return;
  }
  originalConsoleError(...args);
};
