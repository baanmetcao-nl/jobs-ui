import { renderHook, act } from "@testing-library/react";
import useDebouncedCallback from "@/hooks/use-debounced-callback";

describe("useDebouncedCallback", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("does not call the function before the timeout elapses", () => {
    const fn = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(fn, { timeout: 300 })
    );

    act(() => {
      result.current("arg1");
    });

    expect(fn).not.toHaveBeenCalled();
  });

  it("calls the function after the timeout elapses", () => {
    const fn = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(fn, { timeout: 300 })
    );

    act(() => {
      result.current("arg1");
      jest.advanceTimersByTime(300);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("arg1");
  });

  it("resets the timer when called multiple times within the timeout", () => {
    const fn = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(fn, { timeout: 300 })
    );

    act(() => {
      result.current("first");
      jest.advanceTimersByTime(200);
      result.current("second");
      jest.advanceTimersByTime(200);
    });

    // Only 400ms total elapsed since last call — not enough to fire yet
    expect(fn).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("second");
  });

  it("calls the function once even when triggered many times in quick succession", () => {
    const fn = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(fn, { timeout: 500 })
    );

    act(() => {
      for (let i = 0; i < 10; i++) result.current(i);
      jest.advanceTimersByTime(500);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(9);
  });
});
