import { spawn } from "child_process";

type RunResult = {
  stdout: string;
  stderr: string;
  timedOut: boolean;
};

export function runJavaScript(
  code: string,
  input: string,
  timeoutMs = 3000
): Promise<RunResult> {
  return new Promise((resolve) => {
    const child = spawn(
      "docker",
      [
        "run",
        "--rm",
        "-i",

        "--memory",
        "128m",

        "--cpus",
        "0.5",
        
        "--network",
        "none",

        "--pids-limit",
        "64",

        "node:22-alpine",
        "node",
        "-e",
        code,
        ],
      {
        stdio: ["pipe", "pipe", "pipe"],
      }
    );

    let stdout = "";
    let stderr = "";
    let timedOut = false;

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, timeoutMs);

    child.on("close", () => {
      clearTimeout(timer);

      resolve({
        stdout,
        stderr,
        timedOut,
      });
    });

    child.stdin.write(input);
    child.stdin.end();
  });
}