import { spawn } from "child_process";

type RunResult = {
  stdout: string;
  stderr: string;
  timedOut: boolean;
};

export function runJavaScript(
  code: string,
  functionName: string,
  input: string,
  timeoutMs = 10000
): Promise<RunResult> {
  return new Promise((resolve) => {
    let testInput: unknown;

    try {
      testInput = JSON.parse(input);
    } catch {
      resolve({
        stdout: "",
        stderr: "Invalid test case input",
        timedOut: false,
      });
      return;
    }

    let argumentsCode: string;

    if (
      typeof testInput === "object" &&
      testInput !== null &&
      !Array.isArray(testInput)
    ) {
      argumentsCode = Object.values(
        testInput as Record<string, unknown>
      )
        .map((value) => JSON.stringify(value))
        .join(",");
    } else {
      argumentsCode = JSON.stringify(testInput);
    }

    const runner = `
${code}

(async () => {
  try {
    if (typeof ${functionName} !== "function") {
      throw new Error(
        "Function '${functionName}' was not found."
      );
    }

    const result = await ${functionName}(${argumentsCode});

    process.stdout.write(
      JSON.stringify(result)
    );
  } catch (error) {
    process.stderr.write(
      error instanceof Error
        ? error.stack || error.message
        : String(error)
    );

    process.exit(1);
  }
})();
`;

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
        runner,
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

      child.kill("SIGKILL");
    }, timeoutMs);

    child.on("close", () => {
      clearTimeout(timer);

      resolve({
        stdout,
        stderr,
        timedOut,
      });
    });

    child.stdin.end();
  });
}