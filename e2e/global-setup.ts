/**
 * Playwright global setup — starts the mock API server before all tests.
 * The server is kept alive for the whole test run and torn down in global-teardown.
 */
import { type FullConfig } from "@playwright/test";
import { spawn, type ChildProcess } from "node:child_process";
import path from "node:path";

let mockProcess: ChildProcess | undefined;

async function globalSetup(_config: FullConfig) {
  const serverPath = path.resolve(__dirname, "mocks/server.ts");

  mockProcess = spawn("npx", ["tsx", serverPath], {
    stdio: "pipe",
    shell: true,
    env: { ...process.env },
  });

  // Store the process so global-teardown can kill it
  (globalThis as Record<string, unknown>).__mockProcess = mockProcess;

  // Wait for the server to be ready
  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Mock server timeout")),
      10_000,
    );

    mockProcess!.stdout?.on("data", (data: Buffer) => {
      if (data.toString().includes("Mock API server running")) {
        clearTimeout(timeout);
        resolve();
      }
    });

    mockProcess!.stderr?.on("data", (data: Buffer) => {
      console.error("[mock-server]", data.toString());
    });

    mockProcess!.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });

    mockProcess!.on("exit", (code) => {
      if (code !== null && code !== 0) {
        clearTimeout(timeout);
        reject(new Error(`Mock server exited with code ${code}`));
      }
    });
  });
}

export default globalSetup;
