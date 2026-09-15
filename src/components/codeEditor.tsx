"use client";

import { useState } from "react";

type CodeEditorProps = {
  problemId: number;
};

type TestResult = {
  passed: boolean;
  status: string;
  input: string;
  expected: string;
  actual: string;
  error: string | null;
};

export default function CodeEditor({ problemId }: CodeEditorProps) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRun() {
    setLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language: "javascript",
          problemId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setOutput(data.error || "Something went wrong");
        return;
      }

      const results: TestResult[] = data.results || [];

      const passedCount = results.filter(
        (result) => result.passed
      ).length;

      let verdict = "Wrong Answer ❌";

      if (data.passed) {
        verdict = "Accepted ✅";
      } else if (
        results.some(
          (result) => result.status === "TIME_LIMIT"
        )
      ) {
        verdict = "Time Limit Exceeded ⏱️";
      } else if (
        results.some(
          (result) => result.status === "RUNTIME_ERROR"
        )
      ) {
        verdict = "Runtime Error ⚠️";
      }

        const details = results
          .map((result, index) => {
            if (result.passed) {
              return `Test Case ${index + 1}: ✓ Passed`;
            }

            return `Test Case ${index + 1}: ✗ Failed

        Input:
        ${result.input}

        Expected:
        ${result.expected}

        Your Output:
        ${result.actual}${
              result.error
                ? `

        Error:
        ${result.error}`
                : ""
            }`;
          })
          .join("\n\n");

      setOutput(
        `${verdict}\n\n${passedCount}/${results.length} test cases passed\n\n${details}`
      );
    } catch {
      setOutput("Failed to connect to execution server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
          <div className="select-none bg-slate-950 px-4 py-4 text-right font-mono text-sm leading-6 text-slate-600">
            {code.split("\n").map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>

         <textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Tab") {
                event.preventDefault();

                const textarea = event.currentTarget;

                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;

                const newCode =
                  code.substring(0, start) +
                  "  " +
                  code.substring(end);

                setCode(newCode);

                requestAnimationFrame(() => {
                  textarea.selectionStart = start + 2;
                  textarea.selectionEnd = start + 2;
                });
              }
            }}
            className="h-96 flex-1 resize-none bg-transparent p-4 font-mono text-sm leading-6 text-slate-300 outline-none"
            placeholder="Write your solution here..."
          />
      </div>

      <button
        onClick={handleRun}
        disabled={loading}
        className="mt-4 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-500 disabled:opacity-50"
      >
        {loading ? "Running..." : "Run"}
      </button>

      {output && (
        <div className="mt-6">
          <h3 className="mb-2 font-semibold">Output</h3>

          <pre className="rounded-lg bg-slate-900 p-4 text-sm text-slate-300">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}