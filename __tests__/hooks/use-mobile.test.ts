import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "@/hooks/use-mobile";

const MOBILE_BREAKPOINT = 768;

function setupMatchMedia(width: number) {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });

  const listeners: (() => void)[] = [];

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn((query: string) => ({
      matches: width < MOBILE_BREAKPOINT,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: (_: string, cb: () => void) => listeners.push(cb),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  return {
    triggerResize: (newWidth: number) => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: newWidth,
      });
      listeners.forEach((cb) => cb());
    },
  };
}

describe("useIsMobile", () => {
  it("returns true when window width is below the breakpoint", () => {
    setupMatchMedia(375);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("returns false when window width is at or above the breakpoint", () => {
    setupMatchMedia(1024);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns false exactly at the breakpoint (768px)", () => {
    setupMatchMedia(768);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("updates when the window resizes below the breakpoint", () => {
    const { triggerResize } = setupMatchMedia(1024);
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    act(() => {
      triggerResize(375);
    });

    expect(result.current).toBe(true);
  });
});
