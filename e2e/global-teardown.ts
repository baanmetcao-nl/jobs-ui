import { type FullConfig } from "@playwright/test";
import { type ChildProcess } from "node:child_process";

async function globalTeardown(_config: FullConfig) {
  const mockProcess = (globalThis as Record<string, unknown>).__mockProcess as
    | ChildProcess
    | undefined;

  if (mockProcess && !mockProcess.killed) {
    mockProcess.kill("SIGTERM");
  }
}

export default globalTeardown;
